import React from "react";

function Services() {
  const services = [
    { 
      title: "Personal Training", 
      desc: "Get 1-on-1 coaching from top trainers to reach your fitness goals faster.", 
      icon: "🏋️", 
      extraInfo: "Tailored programs to suit your fitness level and needs."
    },
    { 
      title: "Group Workouts", 
      desc: "Join fitness groups for motivation, camaraderie & fun while staying fit.", 
      icon: "🤸", 
      extraInfo: "Engage in dynamic group sessions with expert coaches and peers."
    },
    { 
      title: "Diet Plans", 
      desc: "Custom meal plans designed to maximize your workout results.", 
      icon: "🥗", 
      extraInfo: "Nutrition-based plans to complement your training goals."
    },
    { 
      title: "Yoga & Meditation", 
      desc: "Improve flexibility, mindfulness, and overall wellness.", 
      icon: "🧘‍♀️", 
      extraInfo: "Perfect for reducing stress, increasing mobility, and promoting inner peace."
    },
    { 
      title: "Weight Loss Coaching", 
      desc: "Effective strategies and motivation for achieving your weight loss goals.", 
      icon: "⚖️", 
      extraInfo: "Dedicated support and strategies to shed pounds sustainably."
    },
    { 
      title: "Sports Conditioning", 
      desc: "Boost your strength, agility, and endurance to excel in your sport.", 
      icon: "🏃‍♂️", 
      extraInfo: "Designed for athletes looking to enhance their performance in any sport."
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 via-pink-100 to-red-100 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-purple-700 drop-shadow-md">Our Services</h2>
        <p className="text-black mt-2 text-lg">Achieve your fitness goals with our expert programs. We offer personalized plans for all levels and needs.</p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center"
            >
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-black">{service.title}</h3>
              <p className="text-gray-700 mt-2">{service.desc}</p>
              <p className="text-gray-600 mt-2 italic">{service.extraInfo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;