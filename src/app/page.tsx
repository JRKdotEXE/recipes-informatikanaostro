"use client";

import {ClockIcon, SearchIcon, Heart, CircleX} from "lucide-react";
import Link from "next/link";
import {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type Recipe = {
    id: number;
    title: string;
    description: string;
    is_vegetarian: boolean;
    cuisine: string;
    preparation_time: number;
    image_url: string;
    ingredients: string;
    steps: string;
};

export default function Home() {
    const [query, setquery] = useState("");
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    const fetchRecipes = async () => {
        const response = await fetch("/api/recipes");

        if (response.ok) {
            const data = await response.json();
            setRecipes(data.recipes);
        } else {
            console.error("Failed fetching recipes", response.statusText);
        }
    }

    useEffect(() => {
        fetchRecipes()
    }, []);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favoriteRecipes");
        if (storedFavorites) {
            setFavoriteIds(JSON.parse(storedFavorites));
        }
    }, []);


    const toggleFavorite = (id: number) => {
        const updatedFavorites = favoriteIds.includes(id)
            ? favoriteIds.filter((favoriteId) => favoriteId !== id)
            : [...favoriteIds, id];

        setFavoriteIds(updatedFavorites);
        localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
    };


    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    const clearAll = () => {
        setquery("");
    };

    const deleteRecipe = async (id: number) => {
        const response = await fetch(`/api/recipes/${id}`, { method: "DELETE" });

        if (response.ok) {
            setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
        } else {
            console.error("Failed to delete recipe");
        }
    };


    return (
        <main className="flex justify-center flex-col items-center p-24">
            <h1 className="text-6xl mb-16 font-serif text-gray-700 font-black">
                Your Recipes
            </h1>

            <div className="flex bg-white p-3 w-[400px] rounded-full border-2 border-orange-400">
                <SearchIcon className="size-6 m-2 text-gray-400"/>
                <input placeholder="Search a recipe" className="w-full focus:outline-none" value={query}
                       onChange={(event) => setquery(event.target.value)}/>

                <button onClick={clearAll} className="text-gray-400"><CircleX className="size-6 m-2 pt-1 text-gray-400"/></button>
            </div>

            <section className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="flex flex-col gap-2 bg-white p-8 border-2 border-orange-400 rounded-xl"
                        >
                            <img
                                src={recipe.image_url != null ? recipe.image_url : "https://picsum.photos/200"}
                                width={200}
                                height={200}
                                className="object-cover mx-auto rounded-full aspect-square"
                            />

                            <h2 className="font-medium">{recipe.title}</h2>

                            <div className="flex gap-2">
                                <span
                                    className={`px-3 py-1 text-white rounded-full ${
                                        recipe.is_vegetarian ? "bg-green-500" : "bg-orange-500"
                                    }`}
                                >
                                    {recipe.is_vegetarian ? "Vegetarian" : "Meat"}
                                </span>

                                <span className="px-3 py-1 text-white bg-orange-400 rounded-full">
                                    {recipe.cuisine}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <ClockIcon className="size-6"/>
                                {recipe.preparation_time}m
                            </div>


                            <div className="text-neutral-500 text-justify">
                                <p className="line-clamp-3">
                                    {recipe.description}
                                </p>
                            </div>


                            <div className="flex gap-3">
                            <Link
                                href={`/recipe/${recipe.id}`}
                                className="w-full p-2 text-center mt-2.5 text-white bg-orange-400 rounded-lg font-medium"
                            >
                                Details
                            </Link>


                            <Heart
                                className={`cursor-pointer size-10 mt-2.5 ${
                                    favoriteIds.includes(recipe.id)
                                        ? "text-red-500 fill-red-500"
                                        : "text-gray-400"
                                }`}
                                onClick={() => toggleFavorite(recipe.id)}
                            />
                            </div>

                            <button
                                onClick={() => deleteRecipe(recipe.id)}
                                className="border border-red-500 p-2 text-center mt-2.5 text-red-500 rounded-lg font-medium"
                            >
                                Delete
                            </button>


                        </div>
                    ))
                ) : (
                    query && (
                        <p className="text-gray-500 focus:outline-none text-left">
                        No recipes found for "{query}"
                        </p>
                    )
                )}
            </section>
        </main>
    );
}
