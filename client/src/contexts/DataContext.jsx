import { createContext, useContext, useState, useCallback } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUserStats = useCallback((stats) => {
    setUserStats(stats);
  }, []);

  const updateWorkouts = useCallback((newWorkouts) => {
    setWorkouts(newWorkouts);
  }, []);

  const value = {
    workouts,
    userStats,
    loading,
    error,
    updateUserStats,
    updateWorkouts,
    setLoading,
    setError
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
