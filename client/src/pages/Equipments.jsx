import React, { useEffect } from "react";
import Flickity from "flickity";
import "flickity/css/flickity.css";

const equipmentData = [
  {
    category: "Cardio",
    items: [
      { img: "/Equipments/Cardio/Symbio Runner.png", name: "Symbio Runner", type: "Treadmill" },
      { img: "/Equipments/Cardio/Aspire Runner.png", name: "Aspire Runner", type: "Treadmill" },
      { img: "/Equipments/Cardio/Integrity Cross Trainer.png", name: "Integrity Cross Trainer", type: "Elliptical" },
      { img: "/Equipments/Cardio/IC5 Cycle.png", name: "IC5 Cycle", type: "Bikes & Indoor Cycles" },
      { img: "/Equipments/Cardio/Ride CX.png", name: "Ride CX", type: "Bikes & Indoor Cycles" },
      { img: "/Equipments/Cardio/Total Body Arc Trainer.png", name: "Total Body Arc Trainer", type: "Arc Trainers" },
      { img: "/Equipments/Cardio/Stair Powermill Climber.png", name: "Stair Powermill Climber", type: "Stair Climber & Stepper Machine" },
      { img: "/Equipments/Cardio/Heat Performance Rower.png", name: "Heat Performance Rower", type: "Rowers" },
    ],
  },
  {
    category: "Strength Training",
    items: [
      { img: "/Equipments/Strength Training/Ground Jammer.png", name: "Ground Jammer", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Glute Drive.png", name: "Glute Drive", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Shoulder Press.png", name: "Iso-Lateral Shoulder Press", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/HD Elite Athletics Half NX Rack.png", name: "HD Elite Athletics Half NX Rack", type: "Racks, Rigs, & Platforms" },
      { img: "/Equipments/Strength Training/Hack Squat.png", name: "Hack Squat", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Adjustable Bench.png", name: "Adjustable Bench", type: "Benches" },
      { img: "/Equipments/Strength Training/Olympic Decline Bench.png", name: "Olympic Decline Bench", type: "Benches" },
      { img: "/Equipments/Strength Training/Flat Bench.png", name: "Flat Bench", type: "Benches" },
      { img: "/Equipments/Strength Training/Plate Loaded T-Bar Row.png", name: "Plate Loaded T-Bar Row", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Bench Press.png", name: "Iso-Lateral Bench Press", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Abdominal Oblique Crunch.png", name: "Abdominal Oblique Crunch", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Chest-Back Combo.png", name: "Iso-Lateral Chest-Back Combo", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Front Lat Pulldown.png", name: "Iso-Lateral Front Lat Pulldown", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Flat Bench Press.png", name: "Iso-Lateral Flat Bench Press", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Incline Press.png", name: "Iso-Lateral Incline Press", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Kneeling Leg Curl.png", name: "Iso-Lateral Kneeling Leg Curl", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Low Row.png", name: "Iso-Lateral Low Row", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Wide Chest.png", name: "Iso-Lateral Wide Chest", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Linear Leg Press.png", name: "Linear Leg Press", type: "Plate Loaded" },
    ],
  },
  {
    category: "Accessories",
    items: [
      { img: "/Equipments/Accessories/Studio Dumbbells.png", name: "Studio Dumbbells", type: "Dumbbells & Fixed Barbells" },
      { img: "/Equipments/Accessories/Rubber Hex Dumbbells.png", name: "Rubber Hex Dumbbells", type: "Dumbbells & Fixed Barbells" },
      { img: "/Equipments/Accessories/Olympic Weightlifting Bars.png", name: "Olympic Weightlifting Bars", type: "Barbells & Plates" },
      { img: "/Equipments/Accessories/Training Bars.png", name: "Training Bars", type: "Barbells & Plates" },
      { img: "/Equipments/Accessories/Battle Ropes.png", name: "Battle Ropes", type: "Conditioning Accessories" },
      { img: "/Equipments/Accessories/Core Mat.png", name: "Core Mat", type: "Mobility Accessories" },
      { img: "/Equipments/Accessories/Foam Rollers.png", name: "Foam Rollers", type: "Mobility Accessories" },
      { img: "/Equipments/Accessories/Stability Balls.png", name: "Stability Balls", type: "Mobility Accessories" },
    ],
  },
];

const Equipments = () => {
  useEffect(() => {
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach((carousel) => {
      new Flickity(carousel, {
        imagesLoaded: "true",
        cellAlign: "left",
        contain: true,
        pageDots: false,
        wrapAround: true,
      });
    });
  }, []);

  return (
    <section className="relative py-16">
      <div className="min-h-screen bg-gray-100 p-1">
        <h1 className="text-4xl font-bold text-center mt-12 mb-12">Equipments for All Types of Training</h1>
        {equipmentData.map((section) => (
          <div key={section.category} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">{section.category}</h2>
            <div className="carousel">
              {section.items.map((item, index) => (
                <div key={index} className="carousel-cell w-72 mx-4 text-center">
                  <img src={item.img} alt={item.name} loading="lazy" className="rounded-lg shadow-lg w-auto h-auto object-contain" />
                  <h3 className="mt-4 text-xl font-medium">{item.name}</h3>
                  <p className="text-gray-600">{item.type}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 bg-white rounded-xl shadow-xl p-8">
          <h3 className="text-center text-3xl font-semibold text-gray-800 mb-6">Need Assistance with Equipment?</h3>
          <p className="text-justify text-lg text-gray-700 mb-6">
            Our team is ready to assist you with choosing the right equipment for your fitness goals. Whether you're a beginner or an experienced athlete, we have equipment tailored to your needs.
          </p>
          <a
            className="items-center inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Contact Us for Personalized Recommendations
          </a>
        </div>
      </div>
    </section>
  );
};

export default Equipments;