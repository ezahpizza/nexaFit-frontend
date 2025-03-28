import { useState } from 'react';

interface Nutrient {
    name: string;
    amount: number;
    unit: string;
}

interface Recipe {
    id: number;
    title: string;
    image: string;
    sourceUrl: string;
    readyInMinutes: number;
    servings: number;
    summary: string;
    healthScore: number;
    nutrition?: {
        nutrients: Nutrient[];
    };
}

interface MealPlanResult {
    user_id: string;
    request_data: {
    diet_type: string | null;
    max_calories: number | null;
    intolerances: string[] | null;
    meal_type: string | null;
    };
    recipes: Recipe[];
    timestamp: string;
}

interface MealPlanResultsProps {
    mealPlan: MealPlanResult;
}

const MealPlanResults: React.FC<MealPlanResultsProps> = ({ mealPlan }) => {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    // Function to extract calories from recipe summary
    const extractCaloriesFromSummary = (summary: string): number => {
        if (!summary) return 0;
        
        // Strip HTML tags for cleaner text
        const cleanSummary = summary.replace(/<\/?[^>]+(>|$)/g, "");
        
        // Look for calories pattern: number followed by "calories"
        const caloriesRegex = /(\d+)\s*calories/i;
        const match = cleanSummary.match(caloriesRegex);
        
        if (match && match[1]) {
            return parseInt(match[1], 10);
        }
        
        return 0;
    };

    const getCalories = (recipe: Recipe): number => {
        // First try to get calories from nutrition object if available
        if (recipe.nutrition) {
            const calories = recipe.nutrition.nutrients.find(n => n.name === "Calories");
            if (calories) return calories.amount;
        }
        
        // If nutrition data is not available or doesn't contain calories,
        // extract calories from the summary
        return extractCaloriesFromSummary(recipe.summary);
    };

    const stripHtml = (html: string): string => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <div className="relative z-50 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Your Weekly Meal Plan</h2>

                <div className="text-sm text-gray-600 mb-4">
                    <p>
                        <span className="font-medium">Diet type:</span> {mealPlan.request_data.diet_type || 'None specified'}
                    </p>
                    {mealPlan.request_data.max_calories && (
                    <p>
                        <span className="font-medium">Target calories:</span> {mealPlan.request_data.max_calories} per day
                    </p>
                    )}
                    {mealPlan.request_data.intolerances && mealPlan.request_data.intolerances.length > 0 && (
                    <p>
                        <span className="font-medium">Intolerances:</span> {mealPlan.request_data.intolerances.join(', ')}
                    </p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {mealPlan.recipes.map((recipe) => (
                    <div 
                        key={recipe.id} 
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedRecipe(recipe)}
                    >
                        <div className="aspect-[3/1] w-full overflow-hidden">
                            <img 
                                src={recipe.image} 
                                alt={recipe.title} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/loader-test.webp';
                                }}
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-medium text-sm line-clamp-2">{recipe.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {getCalories(recipe).toFixed(0)} cal · {recipe.readyInMinutes} min
                            </p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {selectedRecipe && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-semibold">{selectedRecipe.title}</h2>
                        <button 
                            onClick={() => setSelectedRecipe(null)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                        &times;
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <img 
                                src={selectedRecipe.image} 
                                alt={selectedRecipe.title}
                                className="w-full h-auto rounded-lg mb-4"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder-food.jpg';
                                }}
                            />

                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-gray-100 p-2 rounded">
                                    <p className="text-sm font-medium">{getCalories(selectedRecipe).toFixed(0)}</p>
                                    <p className="text-xs text-gray-500">Calories</p>
                                </div>
                                <div className="bg-gray-100 p-2 rounded">
                                    <p className="text-sm font-medium">{selectedRecipe.readyInMinutes}</p>
                                    <p className="text-xs text-gray-500">Minutes</p>
                                </div>
                                <div className="bg-gray-100 p-2 rounded">
                                    <p className="text-sm font-medium">{selectedRecipe.servings}</p>
                                    <p className="text-xs text-gray-500">Servings</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">About</h3>
                            <p className="text-sm text-gray-700 mb-4">
                                {stripHtml(selectedRecipe.summary)}
                            </p>

                            {selectedRecipe.nutrition && (
                                <>
                                    <h3 className="text-lg font-medium mb-2">Nutrition Facts</h3>
                                    <div className="space-y-1">
                                        {selectedRecipe.nutrition.nutrients
                                        .filter(nutrient => 
                                        ['Calories', 'Fat', 'Carbohydrates', 'Protein', 'Fiber'].includes(nutrient.name)
                                        )
                                        .map(nutrient => (
                                        <div key={nutrient.name} className="flex justify-between text-sm">
                                            <span>{nutrient.name}</span>
                                            <span>{nutrient.amount.toFixed(1)} {nutrient.unit}</span>
                                        </div>
                                        ))
                                        }
                                    </div>
                                </>
                            )}

                            <a 
                                href={selectedRecipe.sourceUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block mt-4 bg-nexafit-accent text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
                            >
                            View Full Recipe
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealPlanResults;