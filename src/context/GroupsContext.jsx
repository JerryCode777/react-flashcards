// src/contexts/GroupsContext.jsx 
import { createContext, useContext, useState } from 'react';

const GroupsContext = createContext();

export function GroupsProvider({ children }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshGroups = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <GroupsContext.Provider value={{ refreshGroups, refreshTrigger }}>
      {children}
    </GroupsContext.Provider>
  );
}

export const useGroups = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useGroups must be used within a GroupsProvider");
  }
  return context;
};
