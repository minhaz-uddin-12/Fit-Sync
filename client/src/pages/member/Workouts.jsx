import React from 'react';
import { motion } from 'framer-motion';

const Workouts = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 mt-[56px]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-4xl font-extrabold text-gray-900 mb-8 text-center"
                >
                    My Workouts
                    <div className="h-1 w-20 bg-indigo-500 mx-auto mt-2 rounded-full"/>
                </motion.h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Workout cards will go here */}
                </div>
            </div>
        </motion.div>
    );
};

export default React.memo(Workouts, (prevProps, nextProps) => 
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);