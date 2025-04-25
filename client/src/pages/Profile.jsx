import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 mt-[56px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-xl p-8 border border-blue-100">
                <div className="flex items-center mb-8">
                    <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-indigo-600">{user?.name?.[0]}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 ml-4">My Profile</h1>
                </div>
                <div className="grid gap-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <label className="text-sm font-semibold text-indigo-600">Name</label>
                        <p className="mt-1 text-xl text-gray-900">{user?.name}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <label className="text-sm font-semibold text-indigo-600">Email</label>
                        <p className="mt-1 text-xl text-gray-900">{user?.email}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <label className="text-sm font-semibold text-indigo-600">Role</label>
                        <p className="mt-1 text-xl text-gray-900 capitalize">{user?.role}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Profile;
