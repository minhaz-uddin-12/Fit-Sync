import React, { useState } from "react";
import GaugeChart from 'react-gauge-chart';

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [advice, setAdvice] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCalculating(true);

    if (!weight || !height || !age) {
      alert("Please enter weight, height, and age.");
      setIsCalculating(false);
      return;
    }

    // Simulate calculation delay for better UX
    setTimeout(() => {
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
      setIsCalculating(false);
    }, 500);
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

  const getCategoryColor = (categoryName) => {
    switch(categoryName) {
      case "Underweight": return "text-blue-600";
      case "Normal weight": return "text-green-600";
      case "Overweight": return "text-yellow-600";
      case "Obese": return "text-red-600";
      default: return "text-indigo-700";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">BMI Health <span className="text-indigo-600">Calculator</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Calculate your Body Mass Index (BMI) to determine if you're at a healthy weight for your height and get personalized recommendations.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Form Section */}
            <div className="md:w-1/2 p-8 md:p-12 bg-white">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Details</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <div className="flex space-x-4">
                      <div 
                        className={`flex-1 py-3 px-4 rounded-lg border ${gender === 'male' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'} cursor-pointer transition-all`}
                        onClick={() => setGender('male')}
                      >
                        <div className="flex items-center justify-center">
                          <span className={`font-medium ${gender === 'male' ? 'text-indigo-700' : 'text-gray-600'}`}>Male</span>
                        </div>
                      </div>
                      <div 
                        className={`flex-1 py-3 px-4 rounded-lg border ${gender === 'female' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'} cursor-pointer transition-all`}
                        onClick={() => setGender('female')}
                      >
                        <div className="flex items-center justify-center">
                          <span className={`font-medium ${gender === 'female' ? 'text-indigo-700' : 'text-gray-600'}`}>Female</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter your age"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter your weight"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter your height"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full py-3 px-6 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md disabled:opacity-70"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate BMI'}
                </button>
              </form>

              <div className="mt-8">
                <p className="text-xs text-gray-500">
                  Note: This calculator provides an estimate and should not replace medical advice. BMI doesn't differentiate between muscle and fat, and factors like muscle mass can affect results.
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
              {bmi ? (
                <div className="flex flex-col items-center max-w-sm">
                  <div className="w-64 h-64">
                    <GaugeChart
                      id="bmi-gauge-chart"
                      nrOfLevels={30}
                      colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
                      arcWidth={0.3}
                      percent={getGaugeValue(parseFloat(bmi))}
                      textColor="#4338ca"
                      needleColor="#4338ca"
                      needleBaseColor="#4338ca"
                      hideText={true}
                      cornerRadius={6}
                      animDelay={0}
                      animate={true}
                    />
                  </div>
                  
                  <div className="mt-4 text-center">
                    <div className="inline-block bg-white px-6 py-3 rounded-full shadow-md mb-4">
                      <span className="text-gray-600 font-medium">Your BMI</span>
                      <h3 className="text-3xl font-bold text-indigo-700">{bmi}</h3>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <p className="text-lg font-semibold mb-2">
                        Category: <span className={getCategoryColor(category)}>{category}</span>
                      </p>
                      <p className="text-gray-600">{advice}</p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">BMI Categories:</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span>Underweight: &lt;18.5</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span>Normal: 18.5-24.9</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                            <span>Overweight: 25-29.9</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span>Obese: &gt;30</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 bg-white rounded-xl shadow-md max-w-sm">
                  <svg className="w-24 h-24 mx-auto text-indigo-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">BMI Results</h3>
                  <p className="text-gray-600">Enter your details and calculate your BMI to see your health assessment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BMICalculator;