
import React, { useState } from 'react';
import TodoCard from './TodoCard';
import NotesCard from './NotesCard';
import TimerCard from './TimerCard';
import ThemeSwitcher from './ThemeSwitcher';
import FlowModeOverlay from './FlowModeOverlay';
import GoalCard from './GoalCard'; // New import
import { LogoutIcon } from './icons';
import { type TodoItem } from '../types';

interface DashboardPageProps {
    onLogout: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout, theme, toggleTheme }) => {
    const [activeTask, setActiveTask] = useState<TodoItem | null>(null);
    const [isFlowMode, setIsFlowMode] = useState(false);
    const [dailyGoal, setDailyGoal] = useState<{ text: string; completed: boolean }>({ text: '', completed: false });


    const handleStartFlow = (task: TodoItem | null) => {
        setActiveTask(task);
        setIsFlowMode(true);
    };

    const handleEndFlow = () => {
        setIsFlowMode(false);
        // We keep activeTask so the TimerCard remembers the last focused task
    };

    return (
        <div className="min-h-screen bg-light-base dark:bg-dark-base p-4 sm:p-6 lg:p-8 relative">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-light-text dark:text-dark-text">FocusFlow</h1>
                <div className="flex items-center space-x-4">
                    <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
                    <button onClick={onLogout} className="p-2 rounded-full text-light-secondary dark:text-dark-secondary hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <LogoutIcon className="w-6 h-6"/>
                    </button>
                </div>
            </header>

            <main className="space-y-8">
                <GoalCard goal={dailyGoal} setGoal={setDailyGoal} />
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    <TodoCard onStartFlow={handleStartFlow} setActiveTask={setActiveTask} />
                    <NotesCard />
                    <TimerCard activeTask={activeTask} onStartFlow={() => handleStartFlow(activeTask)} />
                </div>
            </main>
            
            <footer className="fixed bottom-4 right-6">
                <p className="text-xs text-light-secondary/50 dark:text-dark-secondary/50">by nbl.</p>
            </footer>

            {isFlowMode && (
                <FlowModeOverlay task={activeTask} onClose={handleEndFlow} />
            )}
        </div>
    );
};

export default DashboardPage;