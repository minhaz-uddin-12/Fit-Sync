import React from 'react';
import { FaDumbbell, FaHeartbeat, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 mt-[56px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-2">
                        Member Dashboard
                    </h1>
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-lg">Premium Member</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Dynamic Stats Cards */}
                                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-white p-3 rounded-lg">
                                                    <FaDumbbell className="text-blue-500 text-3xl" />
                                                </div>
                                                <div className="text-white">
                                                    <h3 className="text-lg font-semibold">Workouts</h3>
                                                    <p className="text-3xl font-bold">24</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-white p-3 rounded-lg">
                                                    <FaHeartbeat className="text-red-500 text-3xl" />
                                                </div>
                                                <div className="text-white">
                                                    <h3 className="text-lg font-semibold">Calories</h3>
                                                    <p className="text-3xl font-bold">1,248</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-white p-3 rounded-lg">
                                                    <FaCalendarAlt className="text-green-500 text-3xl" />
                                                </div>
                                                <div className="text-white">
                                                    <h3 className="text-lg font-semibold">Sessions</h3>
                                                    <p className="text-3xl font-bold">12</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-white p-3 rounded-lg">
                                                    <FaChartLine className="text-purple-500 text-3xl" />
                                                </div>
                                                <div className="text-white">
                                                    <h3 className="text-lg font-semibold">Progress</h3>
                                                    <p className="text-3xl font-bold">85%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="bg-white p-6 rounded-xl shadow-md">
                                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
                                            {/* Add activity list here */}
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
                        {/* Add sessions list here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
