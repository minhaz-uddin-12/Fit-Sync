import React from "react";
import { useState } from "react";

const Dashboard = ({ role }) => {
  const [activeTab, setActiveTab] = useState("home");

  // Dashboard Navigation Links
  const links = {
    member: ["Home", "Workout Plans", "Progress Tracker", "Profile", "Payments"],
    trainer: ["Home", "Manage Plans", "Member Progress", "Schedule", "Profile"],
    admin: ["Home", "User Management", "Payments", "Analytics", "Content Control"],
  };

  const roleLinks = links[role] || links.member;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold mb-8">FitSync Dashboard</h1>

        <nav>
          <ul className="space-y-4">
            {roleLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => setActiveTab(link.toLowerCase().replace(/ /g, "-"))}
                  className={`w-full text-left p-2 rounded-lg transition ${
    activeTab === link.toLowerCase().replace(/ /g, "-")
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-semibold mb-6 capitalize">{activeTab.replace("-", " ")}</h2>

        {/* Dynamic Content Based on Role & Active Tab */}
        {role === "member" && activeTab === "home" && <p>Welcome to your Member Dashboard!</p>}

        {role === "trainer" && activeTab === "home" && <p>Welcome to your Trainer Dashboard!</p>}

        {role === "admin" && activeTab === "home" && <p>Welcome to your Admin Dashboard!</p>}

        <p className="mt-4">(Additional content will go here.)</p>
      </main>
    </div>
  );
};

export default Dashboard;