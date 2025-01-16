"use client";

import {ClockIcon, Heart, LoaderCircle} from "lucide-react";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

type Recipe = {
    id: number;
    title: string;
    description: string;
    is_vegetarian: string;
    cuisine: string;
    preparation_time: number;
    image_url: string;
    ingredients: string;
    steps: string;
};

export default function RecipeDetail({params}: { params: { id: string } }) {
    const [recipe, setRecipe] = useState<Recipe>();
    const router = useRouter();
    const fetchRecipe = async () => {
        const response = await fetch(`/api/recipes/${params.id}`);

        if (response.ok) {
            const data = await response.json();
            setRecipe(data);
        } else {
            console.error("Failed fetching recipes", response.statusText);
        }
    }
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    useEffect(() => {
        fetchRecipe()
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

    if (recipe == null) {
        return <div>
            Recipe with an ID {params.id} not found
        </div>
    }

    const steps = recipe.steps.split(". ")

    return (
        <main className="flex justify-center gap-4 p-24">

            <section className="space-y-8 max-w-screen-sm w-1/2">
                <button className="text-orange-500 text-decoration-line: underline" onClick={() => router.back()}>
                    {"<"} Back
                </button>

                <h1 className="text-6xl font-serif">{recipe.title}</h1>
                <p className="text-neutral-500">{recipe.description}</p>
                <div className="flex gap-2">
                    <span className={`px-3 py-1 text-white rounded-full ${
                        recipe.is_vegetarian ? "bg-green-500" : "bg-orange-500"
                    }`}>
                        {recipe.is_vegetarian ? "Vegetarian" : "Meat"}
                    </span>

                    <span className="px-3 py-1 text-white bg-orange-400 rounded-full">
                        {recipe.cuisine}
                    </span>


                </div>

                <div>
                    <Heart
                        className={`cursor-pointer ${
                            favoriteIds.includes(recipe.id)
                                ? "text-red-500 fill-red-500"
                                : "text-gray-400"
                        }`}
                        onClick={() => toggleFavorite(recipe.id)}
                    />
                </div>

                <div className="flex gap-1 ">
                    <ClockIcon className="size-6"/>
                    {recipe.preparation_time}m
                </div>

                <div>
                    <h2 className="text-2xl font-serif text-gray-700">Ingredients</h2>
                    <p className="text-neutral-500">{recipe.ingredients}</p>
                </div>

                <div>
                    <h2 className="text-2xl font-serif text-gray-700">Steps</h2>
                    <ul>
                        {steps.map((step, index) => (
                            <li className="text-neutral-500" key={step}>{index + 1}. {step}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <picture>
                <img
                    className="rounded-full mx-auto aspect-square object-cover"
                    alt="Food image"
                    src={recipe.image_url}
                    width={500}
                    height={500}
                />
            </picture>
        </main>
    );
}
