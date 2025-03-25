import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ConfirmationModal from "./ConfirmationModal";
import Checkout from "../pages/Checkout";

// Icon imports (You can add your own icons or use icons from libraries like FontAwesome or Heroicons)
import { HiOutlineUsers, HiOutlineFire, HiOutlineStar } from "react-icons/hi";

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
        "Unlimited Equipments",
        "Exercise List",
        "No Time Restriction"
      ],
      buttonText: "Enroll Now",
      icon: <HiOutlineUsers className="text-6xl" />, // Increase icon size
    },
    {
      title: "Unlimited",
      price: "5000 BDT",
      period: "6 Months",
      features: [
        "General Instructions",
        "Free Riding",
        "Unlimited Equipments",
        "Exercise List",
        "Weight Losing Classes",
        "No Time Restriction"
      ],
      buttonText: "Enroll Now",
      icon: <HiOutlineFire className="text-6xl" />,
    },
    {
      title: "Premium",
      price: "10000 BDT",
      period: "12 Months",
      features: [
        "General Instructions",
        "Free Riding",
        "Unlimited Equipments",
        "Exercise List",
        "Weight Losing Classes",
        "Personal Trainer",
        "No Time Restriction"
      ],
      buttonText: "Enroll Now",
      icon: <HiOutlineStar className="text-6xl" />,
    },
  ];

  const handleRegisterClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    console.log('Navigating to checkout with plan:', selectedPlan);  // Add this line for debugging
    navigate("/checkout", { state: { plan: selectedPlan } });
  };  

  return (
    <section className="py-8 bg-gradient-to-r from-green-500 via-teal-600 to-green-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-10">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 flex flex-col relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Plan Period Label */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-white text-blue-600 font-bold px-4 py-2 rounded-full shadow-md">
                {plan.period}
              </div>

              {/* Plan Title */}
              <h3 className="text-2xl font-bold mb-4 transition-colors hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                {plan.title}
              </h3>

              <p className="text-3xl font-extrabold mb-4">{plan.price}</p>

              {/* Feature List */}
              <ul className="text-left text-lg space-y-3 border-t pt-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-white"
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
                  className="mt-6 w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
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