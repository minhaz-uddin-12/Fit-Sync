import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ConfirmationModal from "../components/ConfirmationModal";
import Checkout from "./Checkout";

function Plans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const plans = [
    {
      title: "Drop-In",
      price: "3000 BDT",
      period: "3 Months",
      features: [
        "General Instructions",
        "Free Riding",
        "Unlimited Equipment",
        "Exercise List",
        "No Time Restriction",
      ],
      buttonText: "Enroll Now",
    },
    {
      title: "Unlimited",
      price: "5000 BDT",
      period: "6 Months",
      features: [
        "General Instructions",
        "Free Riding",
        "Unlimited Equipment",
        "Exercise List",
        "Weight Loss Classes",
        "No Time Restriction",
      ],
      buttonText: "Enroll Now",
    },
    {
      title: "Premium",
      price: "10000 BDT",
      period: "12 Months",
      features: [
        "General Instructions",
        "Free Riding",
        "Unlimited Equipment",
        "Exercise List",
        "Weight Loss Classes",
        "Personal Trainer",
        "No Time Restriction",
      ],
      buttonText: "Enroll Now",
    },
  ];

  const handleRegisterClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate("/checkout", { state: { plan: selectedPlan } });
  };

  return (
    <section className="bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-white">
          Choose Your Plan
        </h2>
        <p className="text-lg mb-16 text-gray-300">
          Select the perfect plan for your fitness journey. We offer flexibility, personalized guidance, and value-packed services.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Plan Period Label */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-indigo-600 text-white font-bold px-4 py-2 rounded-full shadow-md">
                {plan.period}
              </div>

              {/* Plan Title */}
              <h3 className="text-2xl font-bold mb-4 text-gray-800 hover:text-indigo-600 transition-colors">
                {plan.title}
              </h3>

              <p className="text-3xl font-extrabold mb-4 text-indigo-600">{plan.price}</p>

              {/* Feature List */}
              <ul className="text-left text-lg space-y-3 border-t pt-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-gray-700">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Enroll Button */}
              <div className="mt-auto">
                <button
                  onClick={() => handleRegisterClick(plan)}
                  className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        message={`Are you sure you want to register for the ${selectedPlan?.title} Plan?`}
      />
    </section>
  );
}

export default Plans;