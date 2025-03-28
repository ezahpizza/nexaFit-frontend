import { useState } from 'react';

interface MealPlanFormProps {
    onSubmit: (formData: {
        diet_type: string | null;
        max_calories: number | null;
        intolerances: string[] | null;
        meal_type: string | null;
    }) => void;
    dietTypes: Array<{ value: string; label: string }>;
    intoleranceOptions: Array<{ value: string; label: string }>;
    isLoading: boolean;
}

const MealPlanForm: React.FC<MealPlanFormProps> = ({ 
    onSubmit, 
    dietTypes, 
    intoleranceOptions,
    isLoading 
}) => {
    const [dietType, setDietType] = useState<string>('');
    const [maxCalories, setMaxCalories] = useState<string>('');
    const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>([]);

    const handleIntoleranceChange = (value: string) => {
        if (selectedIntolerances.includes(value)) {
        setSelectedIntolerances(selectedIntolerances.filter(item => item !== value));
        } 
        else {
        setSelectedIntolerances([...selectedIntolerances, value]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            diet_type: dietType || null,
            max_calories: maxCalories ? parseInt(maxCalories) : null,
            intolerances: selectedIntolerances.length > 0 ? selectedIntolerances : null,
            meal_type: null // Not implementing meal type selection in this version
        });
    };

    return (
        <form onSubmit={handleSubmit} className="relative z-50 space-y-6">
            <div>
                <label htmlFor="diet-type" className="block text-sm font-medium text-gray-700 mb-1">
                Diet Type
                </label>
                <select
                    id="diet-type"
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-nexafit-accent focus:border-nexafit-accent"
                >
                    <option value="">No specific diet</option>
                    {dietTypes.map((diet) => (
                        <option key={diet.value} value={diet.value}>
                        {diet.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="max-calories" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Calories Per Day
                </label>
                <input
                id="max-calories"
                type="number"
                value={maxCalories}
                onChange={(e) => setMaxCalories(e.target.value)}
                placeholder="e.g. 2000"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-nexafit-accent focus:border-nexafit-accent"
                />
            </div>

            <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                Food Intolerances
                </span>
                <div className="grid grid-cols-2 gap-2">
                    {intoleranceOptions.map((intolerance) => (
                    <div key={intolerance.value} className="flex items-center">
                        <input
                        id={`intolerance-${intolerance.value}`}
                        type="checkbox"
                        checked={selectedIntolerances.includes(intolerance.value)}
                        onChange={() => handleIntoleranceChange(intolerance.value)}
                        className="h-4 w-4 text-nexafit-accent focus:ring-nexafit-accent border-gray-300 rounded"
                        />
                        <label
                            htmlFor={`intolerance-${intolerance.value}`}
                            className="ml-2 block text-sm text-gray-700"
                            >
                            {intolerance.label}
                        </label>
                    </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-nexafit-accent text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexafit-accent transition-colors disabled:opacity-50"
                >
                {isLoading ? 'Generating Plan...' : 'Create Meal Plan'}
            </button>
        </form>
    );
};

export default MealPlanForm;