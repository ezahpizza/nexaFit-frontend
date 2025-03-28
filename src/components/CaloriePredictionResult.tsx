import { useState } from 'react';

interface CaloriePredictionInput {
  user_id: string;
  gender: number;
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

interface CaloriePredictionResultProps {
  result: CaloriePredictionResultData;
}

const CaloriePredictionResult: React.FC<CaloriePredictionResultProps> = ({ result }) => {
  const formattedDate = new Date(result.timestamp).toLocaleString();
  const workoutIntensity = getWorkoutIntensity(result.input_data.heart_rate);
  
  function getWorkoutIntensity(heartRate: number): string {
    if (heartRate < 100) return 'Low';
    if (heartRate < 140) return 'Moderate';
    if (heartRate < 170) return 'High';
    return 'Very High';
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Calories Burned Prediction</h2>
      
      <div className="mb-6">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-nexafit-accent text-white text-center p-4 rounded-full w-32 h-32 flex flex-col justify-center">
            <span className="text-2xl font-bold">{Math.round(result.predicted_calories)}</span>
            <span className="text-sm">Calories</span>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-500 mb-4">
          Based on your {result.input_data.duration} minute workout with {workoutIntensity.toLowerCase()} intensity
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="text-sm font-medium text-gray-700">Workout Duration</h3>
          <p className="text-lg">{result.input_data.duration} min</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="text-sm font-medium text-gray-700">Heart Rate</h3>
          <p className="text-lg">{result.input_data.heart_rate} bpm</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="text-sm font-medium text-gray-700">Intensity</h3>
          <p className="text-lg">{workoutIntensity}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="text-sm font-medium text-gray-700">Body Temp</h3>
          <p className="text-lg">{result.input_data.body_temp} °C</p>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="text-md font-medium mb-2">Personal Stats</h3>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <span className="text-gray-600">Age:</span> {result.input_data.age}
          </div>
          <div>
            <span className="text-gray-600">Weight:</span> {result.input_data.weight} kg
          </div>
          <div>
            <span className="text-gray-600">Height:</span> {result.input_data.height} cm
          </div>
          <div>
            <span className="text-gray-600">Gender:</span> {result.input_data.gender === 0 ? 'Male' : 'Female'}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-right">
        Prediction made on {formattedDate}
      </div>
    </div>
  );
};

export default CaloriePredictionResult;