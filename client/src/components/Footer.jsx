import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowUp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { contact, navLinks } from "../data/site";
import { Logo } from "./ui/Logo";

const resources = [
  { path: "/bmicalculator", label: "BMI Calculator" },
  { path: "/plans", label: "Membership Plans" },
  { path: "/register", label: "Become a Member" },
  { path: "/login", label: "Member Login" },
];

function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socials = [
    { href: contact.socials.facebook, icon: FaFacebookF, label: "Facebook" },
    { href: contact.socials.instagram, icon: FaInstagram, label: "Instagram" },
    { href: contact.socials.twitter, icon: FaTwitter, label: "Twitter" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-ink-900">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-400">
            Personal training, group classes and tailored nutrition, with tools to track every step of
            your progress.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.slice(1).map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-zinc-400 transition hover:text-brand-400">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Resources</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {resources.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-zinc-400 transition hover:text-brand-400">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Visit us</h4>
          <ul className="mt-5 space-y-3 text-sm text-zinc-400">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {contact.address}
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="h-4 w-4 shrink-0 text-brand-500" />
              <a href={`mailto:${contact.email}`} className="hover:text-white">{contact.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="h-4 w-4 shrink-0 text-brand-500" />
              {contact.phone}
            </li>
          </ul>
          <div className="mt-6 h-36 overflow-hidden rounded-xl border border-white/10 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0">
            <iframe
              src={contact.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FitSync location"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-zinc-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} FitSync. All rights reserved.</p>
          <p>Built for CSE 242 · East Delta University</p>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-glow transition-all duration-300 hover:bg-brand-600 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-label="Back to top"
      >
        <FaArrowUp className="h-4 w-4" />
      </button>
    </footer>
  );
}

export default Footer;
