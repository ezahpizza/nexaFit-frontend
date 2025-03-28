import { useState } from 'react';

interface CaloriePredictionFormProps {
  onSubmit: (formData: {
    gender: number;
    age: number;
    height: number;
    weight: number;
    duration: number;
    heart_rate: number;
    body_temp: number;
  }) => void;
  isLoading: boolean;
}

const CaloriePredictionForm: React.FC<CaloriePredictionFormProps> = ({ 
  onSubmit, 
  isLoading 
}) => {
  const [gender, setGender] = useState<string>('0'); // 0 for male, 1 for female
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [heartRate, setHeartRate] = useState<string>('');
  const [bodyTemp, setBodyTemp] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      gender: parseInt(gender),
      age: parseFloat(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
      duration: parseFloat(duration),
      heart_rate: parseFloat(heartRate),
      body_temp: parseFloat(bodyTemp)
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative z-50 space-y-4">
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-nexafit-accent focus:border-nexafit-accent"
          required
        >
          <option value="0">Male</option>
          <option value="1">Female</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          Age (years)
        </label>
        <input
          id="age"
          type="number"
          min="1"
          max="120"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-nexafit-accent focus:border-nexafit-accent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
          Height (cm)
        </label>
        <input
          id="height"
          type="number"
          min="50"
          max="250"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-nexafit-accent focus:border-nexafit-accent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
          Weight (kg)
        </label>
        <input
          id="weight"
          type="number"
          min="20"
          max="300"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-nexafit-accent focus:border-nexafit-accent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          Workout Duration (minutes)
        </label>
        <input
          id="duration"
          type="number"
          min="1"
          max="300"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-nexafit-accent focus:border-nexafit-accent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="heart-rate" className="block text-sm font-medium text-gray-700 mb-1">
          Average Heart Rate (bpm)
        </label>
        <input
          id="heart-rate"
          type="number"
          min="40"
          max="220"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-nexafit-accent focus:border-nexafit-accent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="body-temp" className="block text-sm font-medium text-gray-700 mb-1">
          Body Temperature (°C)
        </label>
        <input
          id="body-temp"
          type="number"
          min="35"
          max="41"
          step="0.1"
          value={bodyTemp}
          onChange={(e) => setBodyTemp(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-nexafit-accent focus:border-nexafit-accent"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-nexafit-accent text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexafit-accent transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Calculating...' : 'Calculate Calories'}
      </button>
    </form>
  );
};

export default CaloriePredictionForm;