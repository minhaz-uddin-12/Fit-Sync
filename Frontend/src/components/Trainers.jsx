import React from "react";

// Trainer Data
const trainers = [
  {
    id: 1,
    name: "Enayet Hossain",
    role: "Personal Trainer & Weight Loss Expert",
    specialization: "Weight Loss, HIIT, Nutrition Coaching",
    experience: "7+ years",
    about:
      "Enayet specializes in fat loss transformations through high-intensity workouts and personalized diet plans. His approach ensures clients stay motivated and achieve sustainable results.",
    image: "/Enayet.jpg",
  },
  {
    id: 2,
    name: "Reza Khan",
    role: "Strength & Conditioning Coach",
    specialization: "Strength Training, Powerlifting, Functional Fitness",
    experience: "8+ years",
    about:
      "Reza is passionate about building strength and endurance. With a background in powerlifting and functional training, he focuses on helping clients achieve peak performance.",
    image: "/Reza.jpg",
  },
  {
    id: 3,
    name: "Srishty Das Gupta",
    role: "Yoga & Mobility Exercise Coach",
    specialization: "Yoga, Flexibility, Mind-Body Wellness",
    experience: "6+ years",
    about:
      "Srishty combines movement and mindfulness to help clients improve flexibility, posture, and mental well-being. Her training sessions focus on balance and injury prevention.",
    image: "/Srishty.jpg",
  },
];

const Trainers = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="text-center">
        <p className="text-4xl font-extrabold text-white">Meet Our Expert Trainers</p>
        <p className="mt-2 text-gray-200">Get guidance from the best in the industry.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 mt-10 max-w-7xl mx-auto">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500"
          >
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-40 h-40 mx-auto rounded-full object-cover shadow-lg transition-transform transform hover:scale-110"
            />
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mt-4">{trainer.name}</h4>
            <p className="text-orange-500 text-sm font-semibold">{trainer.role}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{trainer.specialization}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{trainer.experience} Experience</p>
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">{trainer.about}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trainers;