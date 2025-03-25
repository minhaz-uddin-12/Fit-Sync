import React from "react";

const Equipments = () => {
  const equipmentList = [
    {
      title: "Cardio",
      image: "/Cardio.jpg", // Replace with actual image path
      details: [
        "Treadmills",
        "Ellipticals",
        "Bikes & Indoor Cycles",
        "Arc Trainers",
        "Stair Climber & Stepper",
        "Machines",
        "Rower",
      ],
    },
    {
      title: "Strength Training",
      image: "/Strength Training.jpg", // Replace with actual image path
      details: [
        "Dumbbells",
        "Barbells",
        "Kettlebells",
        "Weight Machines",
        "Resistance Bands",
        "Benches",
        "Squat Racks",
      ],
    },
    {
      title: "Accessories",
      image: "/Accessories.jpg", // Replace with actual image path
      details: [
        "Yoga Mats",
        "Foam Rollers",
        "Jump Ropes",
        "Gloves & Straps",
        "Exercise Balls",
        "Battle Ropes",
        "Resistance Bands",
      ],
    },
  ];

  return (
    <section className="py-5 relative overflow-hidden bg-gradient-to-r from-blue-50 via-sky-100 to-violet-100">
      {/* Decorative Background Shape */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-sky-100 to-violet-100 opacity-30 blur-xl"></div>

      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-3xl font-bold italic text-gray-900">Equipments</h2>
        <p className="text-lg text-gray-700 mt-2">
          Equipments for All Training Types
        </p>

        {/* Equipment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {equipmentList.map((item, index) => (
            <div key={index} className="relative group">
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 rounded-lg transition-all duration-300 group-hover:brightness-75"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white text-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <ul className="text-center space-y-1">
                  {item.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipments;