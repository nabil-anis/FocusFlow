import React from 'react';
import { PlayIcon } from './icons';
import { type TodoItem } from '../types';
import Card from './Card';

interface TimerCardProps {
    activeTask: TodoItem | null;
    onStartFlow: () => void;
}

const TimerCard: React.FC<TimerCardProps> = ({ activeTask, onStartFlow }) => {
    return (
        <Card title="Focus Mode">
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="w-56 h-56 mb-8 flex items-center justify-center rounded-full bg-light-base dark:bg-dark-base">
                    <button 
                        onClick={onStartFlow} 
                        className="w-40 h-40 bg-light-card dark:bg-dark-surface rounded-full flex items-center justify-center shadow-inner-lg text-light-accent dark:text-dark-accent transition-transform transform hover:scale-105"
                        aria-label="Start focus session"
                    >
                        <PlayIcon className="w-20 h-20" />
                    </button>
                </div>

                <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                    {activeTask ? activeTask.text : 'Ready to Focus?'}
                </h3>
                <p className="mt-2 text-light-secondary dark:text-dark-secondary">
                    {activeTask ? 'Click the button to enter Flow Mode.' : 'Select a task from your list to begin.'}
                </p>
            </div>
            <div className="text-center text-xs text-light-secondary/80 dark:text-dark-secondary/80">
                <p>Entering Flow Mode will begin a focus session timer.</p>
            </div>
        </Card>
    );
};

export default TimerCard;