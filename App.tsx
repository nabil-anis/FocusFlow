
import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    return (
        <div className="min-h-screen text-light-text dark:text-dark-text transition-colors duration-500">
            {isLoggedIn ? (
                <DashboardPage onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
