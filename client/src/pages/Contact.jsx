import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import { PageHeader } from "../components/ui/Section";
import { useNotification } from "../contexts/NotificationContext";
import { contact } from "../data/site";
import { contactService } from "../services/fitsync.service";
import { Spinner } from "../components/ui/Spinner";

const emptyForm = { name: "", email: "", subject: "", message: "" };

function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  const [isSending, setIsSending] = useState(false);
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await contactService.send(formData);
      showNotification(response.message, "success");
      setFormData(emptyForm);
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setIsSending(false);
    }
  };

  const details = [
    { icon: FaEnvelope, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: FaPhoneAlt, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: FaMapMarkerAlt, label: "Address", value: contact.address },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description="Questions about memberships, coaching or anything else? Reach out and we'll get back to you within one business day."
      />

      <section className="section pt-16">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          <aside className="space-y-6 lg:col-span-2">
            {details.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="card flex items-start gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block font-medium text-white hover:text-brand-400">{value}</a>
                  ) : (
                    <p className="mt-1 font-medium text-white">{value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="card p-6">
              <div className="flex items-center gap-3">
                <FaClock className="h-4 w-4 text-brand-400" />
                <p className="text-xs uppercase tracking-widest text-zinc-500">Opening hours</p>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                {contact.hours.map((h) => (
                  <div key={h.days} className="flex justify-between">
                    <dt className="text-zinc-400">{h.days}</dt>
                    <dd className="font-medium text-white">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          <div className="card p-8 sm:p-10 lg:col-span-3">
            <h2 className="font-display text-3xl font-bold uppercase">Send us a message</h2>
            <p className="mt-2 text-sm text-zinc-400">All fields are required.</p>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label">Full name</label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} className="input" placeholder="Jane Doe" required />
              </div>
              <div>
                <label htmlFor="email" className="label">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="input" placeholder="you@example.com" required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="subject" className="label">Subject</label>
                <input id="subject" name="subject" value={formData.subject} onChange={handleChange} className="input" placeholder="Membership question" required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="label">Message</label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="input resize-none" placeholder="How can we help?" required />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={isSending} className="btn-primary w-full sm:w-auto">
                  {isSending ? <Spinner size="sm" color="white" /> : <><FaPaperPlane className="h-3.5 w-3.5" /> Send message</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
