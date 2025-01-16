"use client";

import { useRouter } from "next/navigation";
import { title } from "process";
import { useState } from "react";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [cuisine, setCuisine] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [image_url, setImage_url] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      is_vegetarian: isVegetarian,
      cuisine,
      preparation_time: Number(preparationTime),
      image_url,
      ingredients,
      steps,
    }

    const body = JSON.stringify(payload)

    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    })

    if (response.ok) {

      alert("Recipe added successfully!")
      router.push("/");
    } else {
      alert("Failed to add recipe.");
    }

    console.log(payload)
  };

  return (
      <main
          className="max-w-screen-md mx-auto p-24 border border-orange-400 mt-8 mb-12 rounded-xl bg-orange-100"
      >
        <h1 className="text-6xl font-serif mb-16 text-center">Add a New Recipe</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Title
            <input
                className="w-full block border-2 border-orange-400 rounded-full px-4 py-2"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
          </label>

          <label>
            Description
            <input
                className="w-full block border-2 border-orange-400 rounded-full px-4 py-2"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
          </label>

          <label className="flex gap-2">
            Is Vegetarian?
            <input
                type="checkbox"
                checked={isVegetarian}
                onChange={(e) => setIsVegetarian(e.target.checked)}
                className="peer h-5 w-5 bg-white cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-500 checked:border-green-500"
            />
          </label>

          <label>
            Cuisine
            <textarea
                className="w-full block border-2 border-orange-400 rounded-lg px-4 py-2"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                required
            />
          </label>

          <label>
            Preparation time (in minutes)
            <input
                className="w-full block border-2 border-orange-400 rounded-full px-4 py-2"
                type="number"
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
                required
            />
          </label>

          <label>
            Ingredients
            <textarea
                className="w-full block border-2 border-orange-400 rounded-lg px-4 py-2"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
            />
          </label>

          <label>
            Steps
            <textarea
                className="w-full block border-2 border-orange-400 rounded-lg px-4 py-2"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                required
            />
          </label>

          <label>
            Image URL
            <input
                className="w-full block border-2 border-orange-400 rounded-full px-4 py-2"
                type="text"
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
                required
            />
          </label>

          <button
              className="w-full block bg-orange-500 text-white rounded-full px-4 py-2 mt-4"
              type="submit"
          >
            Add Recipe
          </button>
        </form>
      </main>
  );
}
