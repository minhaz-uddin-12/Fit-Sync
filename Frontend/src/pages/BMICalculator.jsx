import React, { useState } from "react";
import GaugeChart from 'react-gauge-chart'; // Import the gauge chart component

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [advice, setAdvice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!weight || !height || !age) {
      alert("Please enter weight, height, and age.");
      return;
    }

    const heightInMeters = height / 100;
    let bmiResult = weight / (heightInMeters * heightInMeters);

    // Adjust BMI based on age and gender
    if (age < 18) {
      bmiResult *= 0.95; // Slightly lower BMI for children
    } else if (age > 50) {
      bmiResult *= 1.05; // Slightly higher BMI for older adults
    }

    if (gender === "female") {
      bmiResult *= 0.95; // Women tend to have lower BMI due to body composition
    }

    setBmi(bmiResult.toFixed(1));
    const { category, advice } = getBMICategory(bmiResult);
    setCategory(category);
    setAdvice(advice);
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      return {
        category: "Underweight",
        advice: "Consider eating a balanced diet with more protein and healthy fats to reach a normal weight.",
      };
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      return {
        category: "Normal weight",
        advice: "Great job! Maintain a healthy lifestyle with a balanced diet and regular exercise.",
      };
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      return {
        category: "Overweight",
        advice: "Consider a healthy diet and increased physical activity to reduce excess weight.",
      };
    } else {
      return {
        category: "Obese",
        advice: "It is recommended to seek professional health advice and focus on lifestyle changes.",
      };
    }
  };

  const getGaugeValue = (bmiValue) => {
    if (bmiValue < 15) return 0;
    if (bmiValue > 40) return 1;
    return (bmiValue - 15) / (40 - 15);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 via-teal-200 to-indigo-300">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col md:flex-row">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-indigo-700 mb-4">BMI Calculator</h2>
            <p className="text-gray-600 mb-6">Check your Body Mass Index (BMI) and get health recommendations.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full mt-2 p-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-300"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full mt-2 p-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-300"
                  placeholder="Enter your age"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full mt-2 p-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-300"
                  placeholder="Enter your weight in kg"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full mt-2 p-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-300"
                  placeholder="Enter your height in cm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Calculate BMI
              </button>
            </form>
          </div>

          <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0 flex items-center justify-center">
            {bmi && (
              <div className="flex flex-col items-center">
                <GaugeChart
                  id="bmi-gauge-chart"
                  nrOfLevels={5} // More levels for a smoother chart
                  arcsLength={[0.2, 0.3, 0.3, 0.2]} // Adjust the arc distribution
                  colors={['#5BE12C', '#F5CD19', '#FF9900', '#EA4228']} // Custom colors for each arc
                  percent={getGaugeValue(parseFloat(bmi))}
                  needleColor="black" // Blue needle color
                  textColor="#4A90E2" // Blue text color
                  arcWidth={0.3}
                  cornerRadius={10} // Smooth corners for the chart
                  formatTextValue={(value) => parseFloat(bmi).toFixed(1)} // Show BMI value with one decimal place
                  hideText={true} // Hide the text value inside the chart
                />
                {/* Display the result under the gauge chart */}
                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800">Your BMI: <span className="text-indigo-700">{bmi}</span></h3>
                  <p className="text-lg mt-2 font-medium text-indigo-600">Category: {category}</p>
                  <p className="text-gray-700 mt-4">{advice}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BMICalculator;