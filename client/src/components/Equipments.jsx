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
    <section className="py-16 bg-gradient-to-r from-blue-50 via-sky-100 to-violet-100">
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-sky-100 to-violet-100 opacity-30 blur-xl"></div>

      <div className="container mx-auto px-6 text-center relative">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Equipment</h2>
        <p className="text-lg text-gray-700 mb-8">
          Explore a wide range of equipment for all your training needs.
        </p>

        {/* Equipment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {equipmentList.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transition-all duration-300 group-hover:brightness-75"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <ul className="text-center space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-sm">{detail}</li>
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