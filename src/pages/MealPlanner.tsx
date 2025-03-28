import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import Footer from '../components/Footer';
import BackgroundElements from '../components/BackgroundElements';
import MealPlanForm from '../components/MealPlanForm';
import MealPlanResults from '../components/MealPlanResults';
import { dietTypes, intoleranceOptions } from '../utils/mealPlanOptions';
import Navbar_global from '@/components/Navbar-global';

interface MealPlanRequest {
    diet_type: string | null;
    max_calories: number | null;
    intolerances: string[] | null;
    meal_type: string | null;
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
        nutrients: Array<{
        name: string;
        amount: number;
        unit: string;
        }>;
    };
}

interface MealPlanResult {
    user_id: string;
    request_data: MealPlanRequest;
    recipes: Recipe[];
    timestamp: string;
}

const MealPlanner = () => {
    const { user, isLoaded } = useUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [mealPlanResult, setMealPlanResult] = useState<MealPlanResult | null>(null);
    
    const handleSubmit = async (formData: MealPlanRequest) => {
        if (!isLoaded || !user) {
        setError("You must be logged in to create a meal plan");
        return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
        const response = await axios.post<MealPlanResult>(
            `${import.meta.env.VITE_API_URL}/meal-plan`,
            formData,
            {
            params: { user_id: user.id },
            headers: { 'Content-Type': 'application/json' }
            }
        );
        
        setMealPlanResult(response.data);
        } catch (err) {
        console.error('Error fetching meal plan:', err);
        if (axios.isAxiosError(err) && err.response) {
            setError(err.response.data.detail || 'Failed to generate meal plan');
        } else {
            setError('An unexpected error occurred');
        }
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-nexafit-background text-black overflow-hidden">
            <BackgroundElements />
            <Navbar_global />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Personalized Meal Planner</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <MealPlanForm 
                            onSubmit={handleSubmit} 
                            dietTypes={dietTypes} 
                            intoleranceOptions={intoleranceOptions}
                            isLoading={isLoading}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nexafit-accent"></div>
                            </div>
                            ) : mealPlanResult ? (
                            <MealPlanResults mealPlan={mealPlanResult} />
                            ) : (
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <h2 className="text-xl font-semibold mb-4">Ready to create your meal plan?</h2>
                                <p className="text-gray-600">
                                Fill out the form to generate a personalized weekly meal plan based on your preferences.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
        );
};

export default MealPlanner;