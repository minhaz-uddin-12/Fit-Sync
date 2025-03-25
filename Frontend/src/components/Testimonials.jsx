import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      review: "FitSync changed my life! I lost 15kg in 3 months.",
      image: "/images/john.jpg", // Image path
    },
    {
      name: "Emily Smith",
      review: "The trainers here are amazing and very motivating!",
      image: "/images/emily.jpg", // Image path
    },
    {
      name: "Michael Lee",
      review: "Best gym ever! The group workouts are fun.",
      image: "/images/michael.jpg", // Image path
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-center text-white">
      <h2 className="text-4xl font-extrabold mb-10">What Our Clients Say</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true} // Added loop for infinite scroll
        className="mt-8 w-11/12 sm:w-3/4 lg:w-2/3 mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="p-8 bg-white text-gray-800 rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
          >
            {/* Image */}
            <div className="flex justify-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg"
              />
            </div>
            <p className="text-lg italic text-gray-600 mb-4">"{testimonial.review}"</p>
            <h3 className="text-2xl font-semibold text-blue-600">{testimonial.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Testimonials;
