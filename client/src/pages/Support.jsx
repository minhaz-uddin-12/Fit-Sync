import React from "react";

// Support Data
const support = [
  {
    id: 1,
    name: "Enayet Hossain",
    role: "Personal Trainer & Weight Loss Expert",
    specialization: "Weight Loss, HIIT, Nutrition Coaching",
    experience: "7+ years",
    about:
      "Enayet specializes in fat loss transformations through high-intensity workouts and personalized diet plans. His approach ensures clients stay motivated and achieve sustainable results.",
    image: "/Enayet.jpg",
    certifications: "Certified Personal Trainer, Nutrition Specialist",
    availability: "Monday - Friday: 9:00 AM - 6:00 PM",
    contact: "enayet@fitness.com",
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
    certifications: "Certified Strength Coach, Powerlifting Specialist",
    availability: "Tuesday - Saturday: 10:00 AM - 7:00 PM",
    contact: "reza@fitness.com",
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
    certifications: "Certified Yoga Instructor, Flexibility Specialist",
    availability: "Monday - Thursday: 8:00 AM - 5:00 PM",
    contact: "srishty@fitness.com",
  },
];

const Support = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
      <div className="text-center mb-12">
        <p className="text-4xl font-extrabold text-gray-800">Meet Our Expert Support Team</p>
        <p className="mt-2 text-gray-600">Get guidance from the best in the industry.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 mt-10 max-w-7xl mx-auto">
        {support.map((trainer) => (
          <div
            key={trainer.id}
            className="p-6 bg-white shadow-lg rounded-lg text-center transform transition-transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-40 h-40 mx-auto rounded-full object-cover shadow-lg transition-transform transform hover:scale-110"
            />
            <h4 className="text-xl font-bold text-gray-800 mt-4">{trainer.name}</h4>
            <p className="text-orange-600 text-sm font-semibold">{trainer.role}</p>
            <p className="text-gray-600 text-sm mt-2">{trainer.specialization}</p>
            <p className="text-gray-500 text-sm mt-2">{trainer.experience} Experience</p>
            <p className="mt-4 text-gray-700 text-sm">{trainer.about}</p>

            {/* Additional Information */}
            <div className="mt-6 border-t pt-4">
              <p className="text-sm text-gray-600">
                <strong>Certifications: </strong>
                {trainer.certifications}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Availability: </strong>
                {trainer.availability}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Contact: </strong>
                <a href={`mailto:${trainer.contact}`} className="text-blue-500 hover:text-blue-600">
                  {trainer.contact}
                </a>
              </p>
            </div>

            {/* Call-to-action button */}
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Book a Session
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Support;
