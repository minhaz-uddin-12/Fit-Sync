//import React from "react";
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import Services from "../components/Services";
import Equipments from "../components/Equipments";
import Trainers from "../components/Trainers";
import Plans from "../components/Plans";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <div>
      <Hero />
      <Welcome />
      <Services />
      <Equipments />
      <Trainers />
      <Plans />
      <Testimonials />
    </div>
  );
}

export default Home;