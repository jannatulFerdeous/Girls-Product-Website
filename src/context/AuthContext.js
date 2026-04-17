import React, { createContext, useEffect, useState } from 'react';

const USERS_STORAGE_KEY = 'beauty_auth_users';
const SESSION_STORAGE_KEY = 'beauty_auth_session';

export const AuthContext = createContext(null);

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
};

const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useState(() => readJson(USERS_STORAGE_KEY, []));
  const [currentUser, setCurrentUser] = useState(() => readJson(SESSION_STORAGE_KEY, null));

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [currentUser]);

  const register = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    const existingUser = users.find((user) => user.email === normalizedEmail);
    if (existingUser) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: Date.now(),
      name: trimmedName,
      email: normalizedEmail,
      password,
    };

    setUsers((previousUsers) => [...previousUsers, newUser]);
    setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });

    return { success: true };
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const matchedUser = users.find(
      (user) => user.email === normalizedEmail && user.password === password,
    );

    if (!matchedUser) {
      return { success: false, message: 'Invalid email or password.' };
    }

    setCurrentUser({
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
    });

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
