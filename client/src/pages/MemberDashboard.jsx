import { useState } from "react";
import UserNavbar from "../components/UserNavbar"; // Import UserNavbar for logged-in users
import Footer from "../components/Footer"; // Footer component

function MemberDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <UserNavbar />
      <main className="flex-grow">
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">Dashboard</h2>
              <nav className="mt-4">
                <ul className="space-y-4">
                  <li>
                    <button 
                      className={`text-lg text-gray-600 dark:text-gray-300 hover:text-blue-500 ${activeTab === "overview" && "font-bold"}`}
                      onClick={() => setActiveTab("overview")}
                    >
                      Overview
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`text-lg text-gray-600 dark:text-gray-300 hover:text-blue-500 ${activeTab === "progress" && "font-bold"}`}
                      onClick={() => setActiveTab("progress")}
                    >
                      Progress
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`text-lg text-gray-600 dark:text-gray-300 hover:text-blue-500 ${activeTab === "workouts" && "font-bold"}`}
                      onClick={() => setActiveTab("workouts")}
                    >
                      Workouts
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`text-lg text-gray-600 dark:text-gray-300 hover:text-blue-500 ${activeTab === "settings" && "font-bold"}`}
                      onClick={() => setActiveTab("settings")}
                    >
                      Settings
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {/* Content Based on Active Tab */}
              {activeTab === "overview" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Welcome to Your Dashboard!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Here you can track your workouts, progress, and settings.</p>
                </div>
              )}

              {activeTab === "progress" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Your Progress</h3>
                  <div className="mt-4">
                    <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full">
                      <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">75% of your goal achieved</p>
                  </div>
                </div>
              )}

              {activeTab === "workouts" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Your Workouts</h3>
                  <div className="mt-4">
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Morning Run</span>
                        <button className="text-blue-500">View Details</button>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Strength Training</span>
                        <button className="text-blue-500">View Details</button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Settings</h3>
                  <div className="mt-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                      Change Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MemberDashboard;