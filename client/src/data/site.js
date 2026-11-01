import {
  FaDumbbell,
  FaUsers,
  FaAppleAlt,
  FaSpa,
  FaWeight,
  FaRunning,
} from "react-icons/fa";

export const contact = {
  email: "info@fitsync.com",
  phone: "+123 456 7890",
  address: "123 Fitness Street, Wellness City, 12345",
  hours: [
    { days: "Mon – Fri", time: "6:00 AM – 11:00 PM" },
    { days: "Sat – Sun", time: "8:00 AM – 9:00 PM" },
  ],
  socials: {
    facebook: "https://www.facebook.com/wasik.imam",
    instagram: "https://www.instagram.com/pretul_chowdhury/",
    twitter: "#",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.4959821587554!2d91.80470027490425!3d22.37265227963467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd85f4dba6a6b%3A0x812e380dbc9fee53!2sEast%20Delta%20University!5e0!3m2!1sen!2sbd!4v1742460809611!5m2!1sen!2sbd",
};

export const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/equipments", label: "Equipment" },
  { path: "/plans", label: "Plans" },
  { path: "/support", label: "Coaches" },
  { path: "/contact", label: "Contact" },
];

export const stats = [
  { value: "2,500+", label: "Active members" },
  { value: "35+", label: "Pieces of equipment" },
  { value: "20+", label: "Weekly classes" },
  { value: "4.9/5", label: "Member rating" },
];

export const services = [
  {
    title: "Personal Training",
    desc: "One-on-one coaching from certified trainers who build every session around your goals.",
    extra: "Custom programming, form checks and weekly progress reviews.",
    icon: FaDumbbell,
  },
  {
    title: "Group Workouts",
    desc: "High-energy classes that keep you accountable and make hard work feel easier.",
    extra: "HIIT, spin, circuits and strength classes every day of the week.",
    icon: FaUsers,
  },
  {
    title: "Nutrition Plans",
    desc: "Practical meal plans that fuel your training and fit your lifestyle.",
    extra: "Macro targets, grocery lists and monthly check-ins.",
    icon: FaAppleAlt,
  },
  {
    title: "Yoga & Mobility",
    desc: "Improve flexibility, posture and recovery with guided mobility work.",
    extra: "Reduce stress and lower your risk of injury.",
    icon: FaSpa,
  },
  {
    title: "Weight Loss Coaching",
    desc: "Sustainable fat-loss strategies with ongoing support from a dedicated coach.",
    extra: "Habit coaching built for long-term results.",
    icon: FaWeight,
  },
  {
    title: "Sports Conditioning",
    desc: "Build strength, speed and endurance for your sport.",
    extra: "Athlete-focused programs for a competitive edge.",
    icon: FaRunning,
  },
];

export const plans = [
  {
    title: "Drop-In",
    price: 3000,
    currency: "BDT",
    period: "3 Months",
    tagline: "Everything you need to get started.",
    features: [
      "General instructions",
      "Free riding",
      "Unlimited equipment access",
      "Exercise library",
      "No time restrictions",
    ],
  },
  {
    title: "Unlimited",
    price: 5000,
    currency: "BDT",
    period: "6 Months",
    tagline: "Our most popular plan for steady progress.",
    popular: true,
    features: [
      "General instructions",
      "Free riding",
      "Unlimited equipment access",
      "Exercise library",
      "Weight loss classes",
      "No time restrictions",
    ],
  },
  {
    title: "Premium",
    price: 10000,
    currency: "BDT",
    period: "12 Months",
    tagline: "Full coaching for maximum results.",
    features: [
      "General instructions",
      "Free riding",
      "Unlimited equipment access",
      "Exercise library",
      "Weight loss classes",
      "Dedicated personal trainer",
      "No time restrictions",
    ],
  },
];

export const trainers = [
  {
    id: 1,
    name: "Enayet Hossain",
    role: "Personal Trainer & Weight Loss Expert",
    specialization: ["Weight Loss", "HIIT", "Nutrition"],
    experience: "7+ years",
    about:
      "Enayet specializes in fat-loss transformations through high-intensity training and personalized diet plans, keeping clients motivated toward sustainable results.",
    image: "/Enayet.jpg",
    certifications: "Certified Personal Trainer, Nutrition Specialist",
    availability: "Mon – Fri · 9:00 AM – 6:00 PM",
    contact: "enayet@fitness.com",
  },
  {
    id: 2,
    name: "Reza Khan",
    role: "Strength & Conditioning Coach",
    specialization: ["Strength", "Powerlifting", "Functional"],
    experience: "8+ years",
    about:
      "With a background in powerlifting and functional training, Reza helps clients build real strength and endurance for peak performance.",
    image: "/Reza.jpg",
    certifications: "Certified Strength Coach, Powerlifting Specialist",
    availability: "Tue – Sat · 10:00 AM – 7:00 PM",
    contact: "reza@fitness.com",
  },
  {
    id: 3,
    name: "Srishty Das Gupta",
    role: "Yoga & Mobility Coach",
    specialization: ["Yoga", "Flexibility", "Mind-Body"],
    experience: "6+ years",
    about:
      "Srishty combines movement and mindfulness to improve flexibility, posture and mental well-being, with a focus on balance and injury prevention.",
    image: "/Srishty.jpg",
    certifications: "Certified Yoga Instructor, Flexibility Specialist",
    availability: "Mon – Thu · 8:00 AM – 5:00 PM",
    contact: "srishty@fitness.com",
  },
];

export const testimonials = [
  {
    name: "John Doe",
    title: "Member since 2024",
    review:
      "FitSync changed my life. The coaching and tracking kept me consistent, and I lost 15 kg in three months.",
  },
  {
    name: "Emily Smith",
    title: "Unlimited plan",
    review:
      "The trainers are incredible: knowledgeable, patient and genuinely invested in my progress.",
  },
  {
    name: "Michael Lee",
    title: "Premium plan",
    review:
      "Best gym I've been to. The group classes are fun and the equipment is always in great shape.",
  },
];

export const equipmentCategories = [
  {
    title: "Cardio",
    image: "/Cardio.jpg",
    details: ["Treadmills", "Ellipticals", "Indoor cycles", "Arc trainers", "Stair climbers", "Rowers"],
  },
  {
    title: "Strength Training",
    image: "/Strength Training.jpg",
    details: ["Dumbbells", "Barbells", "Kettlebells", "Plate-loaded machines", "Benches", "Squat racks"],
  },
  {
    title: "Accessories",
    image: "/Accessories.jpg",
    details: ["Yoga mats", "Foam rollers", "Jump ropes", "Stability balls", "Battle ropes", "Resistance bands"],
  },
];

export const formatPrice = (plan) =>
  `${plan.price.toLocaleString("en-US")} ${plan.currency}`;
