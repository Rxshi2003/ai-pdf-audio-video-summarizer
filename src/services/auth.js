/**
 * User data and session management using localStorage.
 * This ensures the app is a "complete frontend application" without a backend.
 */

const USERS_KEY = 'ai_qa_users';
const SESSION_KEY = 'ai_qa_session';

export const authService = {
    // Signup a new user
    signup: (userData) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        if (users.find(u => u.email === userData.email)) {
            throw new Error('User already exists');
        }
        users.push(userData);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return true;
    },

    // Login a user
    login: (email, password) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, name: user.name }));
        return user;
    },

    // Get current logged-in user
    getCurrentUser: () => {
        const session = localStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    },

    // Logout
    logout: () => {
        localStorage.removeItem(SESSION_KEY);
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem(SESSION_KEY);
    }
};
