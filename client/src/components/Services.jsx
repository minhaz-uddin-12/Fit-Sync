import React from "react";

function Services() {
  const services = [
    { title: "Personal Training", desc: "Get 1-on-1 coaching from certified trainers.", icon: "🏋️" },
    { title: "Group Workouts", desc: "Engage in dynamic group classes for extra motivation.", icon: "🤸" },
    { title: "Diet Plans", desc: "Receive tailored nutrition plans for optimal results.", icon: "🥗" },
  ];

  return (
    <section className="py-16 bg-gray-100 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Our Services</h2>
        <p className="text-lg text-gray-600 mb-12">
          Explore personalized programs designed to help you achieve your fitness goals.
        </p>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-xl transform transition-transform duration-300 hover:scale-105 flex flex-col items-center text-center"
            >
              <div className="text-6xl mb-6">{service.icon}</div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;