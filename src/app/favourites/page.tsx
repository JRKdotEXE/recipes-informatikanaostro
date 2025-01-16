"use client";

import {ClockIcon, Heart} from "lucide-react";
import Link from "next/link";
import {useEffect, useState} from "react";

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

export default function FavouritePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favoriteRecipes");
        if (storedFavorites) {
            setFavoriteIds(JSON.parse(storedFavorites));
        }
    }, []);

    const fetchRecipes = async () => {
        const response = await fetch("/api/recipes");
        if (response.ok) {
            const data = await response.json();
            setRecipes(data.recipes);
        } else {
            console.error("Failed fetching recipes", response.statusText);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const favoriteRecipes = recipes.filter((recipe) => favoriteIds.includes(recipe.id));

    const toggleFavorite = (id: number) => {
        const updatedFavorites = favoriteIds.includes(id)
            ? favoriteIds.filter((favoriteId) => favoriteId !== id)
            : [...favoriteIds, id];

        setFavoriteIds(updatedFavorites);
        localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
    };

    return (
        <main className="flex justify-center flex-col items-center p-24">
            <section className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {favoriteRecipes.length > 0 ? (
                favoriteRecipes.map((recipe) => (
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

                        <Heart
                            className={`cursor-pointer ${
                                favoriteIds.includes(recipe.id) ? "text-red-500 fill-red-500" : "text-gray-400"
                            }`}
                            onClick={() => toggleFavorite(recipe.id)}
                        />

                        <Link
                            href={`/recipe/${recipe.id}`}
                            className="w-full p-2 text-center mt-2.5 text-white bg-orange-400 rounded-lg font-medium"
                        >
                            Details
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No favorite recipes yet.</p>
            )}
        </section>
        </main>
    );
}
