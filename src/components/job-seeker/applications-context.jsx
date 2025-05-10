import React, { createContext, useContext, useState } from 'react';

// إنشاء الكونتكست
const ApplicationsContext = createContext();

// هوك مخصص للوصول للكونتكست
export const useApplications = () => {
  return useContext(ApplicationsContext);
};

// البروڤايدر
export const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  const addApplication = (job) => {
    const newApp = {
      id: Date.now(),
      jobTitle: job.title,
      company: job.company,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setApplications((prev) => [...prev, newApp]);
  };

  return (
    <ApplicationsContext.Provider value={{ applications, addApplication }}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export default ApplicationsProvider;
