import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import Navbar_home from '../components/Navbar-home';
import Footer from '../components/Footer';
import BackgroundElements from '../components/BackgroundElements';
import CaloriePredictionForm from '../components/CaloriePredictionForm';
import CaloriePredictionResult from '../components/CaloriePredictionResult';

interface CaloriePredictionInput {
  user_id: string;
  gender: number;  // 0 for male, 1 for female
  age: number;
  height: number;
  weight: number;
  duration: number;
  heart_rate: number;
  body_temp: number;
}

interface CaloriePredictionResultData {
  user_id: string;
  input_data: CaloriePredictionInput;
  predicted_calories: number;
  timestamp: string;
}

const CaloriePredictor = () => {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<CaloriePredictionResultData | null>(null);
  
  const handleSubmit = async (formData: Omit<CaloriePredictionInput, 'user_id'>) => {
    if (!isLoaded || !user) {
      setError("You must be logged in to predict calories");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post<CaloriePredictionResultData>(
        `${import.meta.env.VITE_API_URL}/predict-calories`,
        {
          ...formData,
          user_id: user.id
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      setPredictionResult(response.data);
    } catch (err) {
      console.error('Error predicting calories:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.detail || 'Failed to predict calories');
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
      <Navbar_home />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Workout Calorie Calculator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CaloriePredictionForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading}
              />
            </div>
          </div>
          
          <div className="lg:col-span-7">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nexafit-accent"></div>
              </div>
            ) : predictionResult ? (
              <CaloriePredictionResult result={predictionResult} />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-semibold mb-4">Ready to calculate your calories?</h2>
                <p className="text-gray-600">
                  Fill out the form with your workout details to estimate calories burned.
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

export default CaloriePredictor;