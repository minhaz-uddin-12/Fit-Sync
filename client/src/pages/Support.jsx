import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/ui/Section";
import { TrainerCard } from "../components/Trainers";
import { BookSessionModal } from "../components/BookSessionModal";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import { trainers } from "../data/site";

const Support = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingWith, setBookingWith] = useState(null);

  const handleBook = (trainer) => {
    if (!user) {
      showNotification("Log in or create an account to book a session.", "info");
      navigate("/login", { state: { from: location } });
      return;
    }
    if (user.role !== "member") {
      showNotification("Sessions can be booked from member accounts.", "info");
      return;
    }
    setBookingWith(trainer.contact);
  };

  return (
    <>
      <PageHeader
        eyebrow="Coaches & support"
        title="Meet our expert support team"
        description="Certified coaches ready to guide your training, nutrition and recovery. Book a session directly with any of them."
      />
      <section className="section pt-16">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {trainers.map((trainer, i) => (
            <TrainerCard key={trainer.id} trainer={trainer} index={i} detailed onBook={handleBook} />
          ))}
        </div>
      </section>
      <BookSessionModal
        isOpen={!!bookingWith}
        trainerEmail={bookingWith}
        onClose={() => setBookingWith(null)}
        onBooked={() => navigate("/dashboard")}
      />
    </>
  );
};

export default Support;
