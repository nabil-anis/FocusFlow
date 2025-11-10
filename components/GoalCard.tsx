import React, { useState, useEffect } from 'react';
import { TargetIcon, PlusIcon, XIcon, CheckmarkIcon } from './icons';

interface GoalCardProps {
    goal: { text: string; completed: boolean };
    setGoal: (goal: { text: string; completed: boolean }) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, setGoal }) => {
    const [inputText, setInputText] = useState('');
    const [isConfirmingClear, setIsConfirmingClear] = useState(false);
    
    useEffect(() => {
        if (isConfirmingClear) {
            const timer = setTimeout(() => {
                setIsConfirmingClear(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isConfirmingClear]);


    const handleSetGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim()) {
            setGoal({ text: inputText, completed: false });
            setInputText('');
        }
    };

    const handleToggleCompletion = () => {
        setGoal({ ...goal, completed: !goal.completed });
    };

    const requestClearGoal = () => {
        setIsConfirmingClear(true);
    }

    const handleClearGoal = () => {
        setGoal({ text: '', completed: false });
        setIsConfirmingClear(false);
    };

    return (
        <div className="bg-light-card dark:bg-dark-surface rounded-4xl shadow-light dark:shadow-dark p-6">
            <div className="flex items-center mb-4">
                <TargetIcon className="w-6 h-6 mr-3 text-light-accent dark:text-dark-accent" />
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text">Today's Goal</h2>
            </div>
            
            {!goal.text ? (
                <form onSubmit={handleSetGoal} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="What's your main focus today?"
                        className="flex-grow p-3 bg-light-base dark:bg-dark-base border-transparent focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:outline-none rounded-lg transition-colors"
                    />
                    <button type="submit" className="p-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover-gradient transition-all transform hover:scale-105">
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </form>
            ) : (
                <div className="group relative">
                    <div 
                        onClick={handleToggleCompletion}
                        className={`p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-500 ease-in-out ${goal.completed ? 'bg-teal-500/10 dark:bg-teal-500/20' : 'hover:bg-light-base/50 dark:hover:bg-dark-base/50'}`}
                    >
                         <p className={`text-3xl font-bold text-center transition-all duration-500 ${goal.completed ? 'opacity-50' : 'text-light-text dark:text-dark-text'}`}>
                            <span className="relative inline-block">
                                {goal.text}
                                <span className={`absolute top-1/2 left-0 h-0.5 bg-light-secondary dark:bg-dark-secondary transition-all duration-500 ease-in-out ${goal.completed ? 'w-full' : 'w-0'}`}></span>
                            </span>
                        </p>
                        
                        {goal.completed && (
                            <div className="mt-6 flex flex-col items-center justify-center text-center text-teal-600 dark:text-teal-400 animate-accomplishment">
                                <CheckmarkIcon className="w-12 h-12" />
                                <span className="mt-2 text-xl font-semibold">Goal Accomplished!</span>
                            </div>
                        )}
                    </div>

                    <div className="absolute top-2 right-2">
                        {isConfirmingClear ? (
                            <button 
                                onClick={handleClearGoal}
                                className="px-3 py-1 text-sm text-red-500 font-semibold rounded-lg hover:bg-red-500/10"
                                aria-label="Confirm clear goal"
                            >
                                Confirm?
                            </button>
                        ) : (
                            <button 
                                onClick={requestClearGoal}
                                className="p-2 text-light-secondary/50 dark:text-dark-secondary/50 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label="Clear goal"
                            >
                                <XIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoalCard;