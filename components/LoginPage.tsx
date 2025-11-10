
import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: () => void;
}

const InputField: React.FC<{ label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }> = ({ label, type, value, onChange, placeholder }) => (
    <div>
        <label className="text-sm font-medium text-light-secondary dark:text-dark-secondary">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1 w-full p-3 bg-white/50 dark:bg-dark-base border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:outline-none transition duration-300"
            required
        />
    </div>
);

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (name && email && age) {
            onLogin();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-light-base dark:bg-dark-base">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-light-card/80 dark:bg-dark-surface/80 backdrop-blur-2xl p-8 sm:p-12 rounded-4xl shadow-light dark:shadow-dark">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-light-text dark:text-dark-text tracking-tight">FocusFlow</h1>
                        <p className="mt-3 text-light-secondary dark:text-dark-secondary">
                            Sign up to join FocusFlow — the AI productivity platform that keeps you in flow.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Appleseed" />
                        <InputField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@apple.com" />
                        <InputField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" />
                        
                        <button 
                            type="submit" 
                            className="w-full bg-light-accent dark:bg-dark-accent text-white font-bold py-3 px-4 rounded-lg hover-gradient transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                        >
                            Join the Flow
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;