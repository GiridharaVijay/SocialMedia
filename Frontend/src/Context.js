import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
  let storedUser = {};
  let storedLogin = false;
  if (typeof window !== 'undefined') {
    try {
      const storedUserString = localStorage.getItem('userDet');
      const storedLoginString = localStorage.getItem('isLogin1');
      storedUser = storedUserString ? JSON.parse(storedUserString) : null;
      storedLogin = storedLoginString ? JSON.parse(storedLoginString):false;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      storedUser = {}; 
    }
    console.log("USER:", storedUser);
  }

  const [user, setUser] = useState(storedUser);
  const [isLogin, setLogin] = useState(storedLogin);

  // useEffect to update localStorage whenever the user changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
        console.log("kkk")
      localStorage.setItem('userDet', JSON.stringify(user));
      localStorage.setItem('isLogin1', isLogin.toString());
    }
  }, [user,isLogin]);

  const updateUser = (updatedUser) => {
    console.log(updatedUser)
    setUser(updatedUser);
  };

 

  const checkLogin = (acc) => {
    setLogin(acc);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isLogin, checkLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
