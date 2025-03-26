import React from "react";

function Services() {
  const services = [
    {
      title: "Personal Training",
      desc: "Get 1-on-1 coaching from certified trainers to accelerate your fitness journey.",
      icon: "🏋️",
      extraInfo: "Customized workout plans tailored to your goals and lifestyle."
    },
    {
      title: "Group Workouts",
      desc: "Join dynamic group sessions for motivation, fun, and community support.",
      icon: "🤸",
      extraInfo: "Stay inspired by working out with like-minded fitness enthusiasts."
    },
    {
      title: "Diet Plans",
      desc: "Personalized nutrition plans to enhance your fitness outcomes.",
      icon: "🥗",
      extraInfo: "Balanced, effective meal plans tailored to your fitness goals."
    },
    {
      title: "Yoga & Meditation",
      desc: "Enhance your flexibility, mindfulness, and inner peace.",
      icon: "🧘‍♀️",
      extraInfo: "Designed to reduce stress and promote holistic well-being."
    },
    {
      title: "Weight Loss Coaching",
      desc: "Effective strategies and ongoing support to help you lose weight sustainably.",
      icon: "⚖️",
      extraInfo: "Personalized coaching to ensure long-term success."
    },
    {
      title: "Sports Conditioning",
      desc: "Improve strength, agility, and endurance for peak athletic performance.",
      icon: "🏃‍♂️",
      extraInfo: "Ideal for athletes looking to elevate their competitive edge."
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-200 text-center relative overflow-hidden py-[56px] mt-[56px]">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-8 drop-shadow-md">Our Services</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
          Explore our professional services tailored to support your fitness journey. From personalized training to specialized coaching, we've got you covered.
        </p>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-3xl shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center"
            >
              <div className="text-7xl mb-6">{service.icon}</div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <p className="text-gray-500 italic">{service.extraInfo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
