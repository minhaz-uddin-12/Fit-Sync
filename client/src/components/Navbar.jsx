import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown, FaSignOutAlt, FaThLarge, FaUser, FaDumbbell } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { navLinks } from "../data/site";
import { Logo } from "./ui/Logo";

const roleLinks = {
  member: [
    { path: "/dashboard", label: "Dashboard", icon: FaThLarge },
    { path: "/workouts", label: "My Workouts", icon: FaDumbbell },
    { path: "/profile", label: "Profile", icon: FaUser },
  ],
  trainer: [
    { path: "/trainer/dashboard", label: "Trainer Panel", icon: FaThLarge },
    { path: "/profile", label: "Profile", icon: FaUser },
  ],
  admin: [
    { path: "/admin/dashboard", label: "Admin Panel", icon: FaThLarge },
    { path: "/profile", label: "Profile", icon: FaUser },
  ],
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const links = roleLinks[user?.role?.toLowerCase()] || [];
  const initial = user?.name?.[0]?.toUpperCase() || "U";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const solid = scrolled || isOpen;

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-white" : "text-zinc-400 hover:text-white"
    }`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "border-b border-white/5 bg-ink-950/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center lg:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} end={link.path === "/"} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn-ghost">Log in</Link>
              <Link to="/register" className="btn-primary py-2.5">Join now</Link>
            </>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4 text-sm font-medium text-white transition hover:border-white/20"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 font-semibold">
                  {initial}
                </span>
                <span className="max-w-[8rem] truncate">{user?.name || "My account"}</span>
                <FaChevronDown className={`h-3 w-3 text-zinc-400 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="card absolute right-0 mt-3 w-60 overflow-hidden p-1.5"
                    role="menu"
                  >
                    <div className="px-3 py-2.5">
                      <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
                      <p className="text-xs capitalize text-zinc-500">{user?.role} account</p>
                    </div>
                    <div className="my-1 h-px bg-white/5" />
                    {links.map(({ path, label, icon: Icon }) => (
                      <Link
                        key={path}
                        to={path}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
                        role="menuitem"
                      >
                        <Icon className="h-3.5 w-3.5 text-zinc-500" />
                        {label}
                      </Link>
                    ))}
                    <div className="my-1 h-px bg-white/5" />
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10"
                      role="menuitem"
                    >
                      <FaSignOutAlt className="h-3.5 w-3.5" />
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="rounded-lg p-2 text-zinc-300 transition hover:bg-white/5 hover:text-white lg:hidden"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 lg:hidden"
          >
            <div className="container-x space-y-1 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-base font-medium ${
                      isActive ? "bg-white/5 text-white" : "text-zinc-400 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="my-3 h-px bg-white/5" />
              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Link to="/login" className="btn-secondary">Log in</Link>
                  <Link to="/register" className="btn-primary">Join now</Link>
                </div>
              ) : (
                <>
                  <p className="px-3 pb-1 text-xs uppercase tracking-widest text-zinc-500">{user?.role} account</p>
                  {links.map(({ path, label }) => (
                    <Link key={path} to={path} className="block rounded-lg px-3 py-2.5 text-base text-zinc-300 hover:text-white">
                      {label}
                    </Link>
                  ))}
                  <button onClick={logout} className="block w-full rounded-lg px-3 py-2.5 text-left text-base text-red-400">
                    Log out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
