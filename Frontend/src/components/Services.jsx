import React from "react";

function Services() {
  const services = [
    { title: "Personal Training", desc: "Get 1-on-1 coaching from top trainers.", icon: "🏋️" },
    { title: "Group Workouts", desc: "Join fitness groups for motivation & fun.", icon: "🤸" },
    { title: "Diet Plans", desc: "Custom meal plans for maximum results.", icon: "🥗" },
  ];

  return (
    <section className="py-5 bg-gradient-to-r from-yellow-100 via-teal-150 to-indigo-200 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-purple-700 drop-shadow-md">Our Services</h2>
        <p className="text-black mt-2 text-lg">Achieve your fitness goals with our expert programs.</p>

        <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-300 p-7 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center"
            >
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-black">{service.title}</h3>
              <p className="text-black mt-2">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;