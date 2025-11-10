import React, { useState, useEffect } from 'react';
import { type TodoItem } from '../types';
import { PlayIcon, PauseIcon, XIcon, Bars3Icon, RefreshIcon } from './icons';

interface FlowModeOverlayProps {
    task: TodoItem | null;
    onClose: () => void;
}

const FlowModeOverlay: React.FC<FlowModeOverlayProps> = ({ task, onClose }) => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [scratchpadText, setScratchpadText] = useState('');

    useEffect(() => {
        let interval: number | null = null;
        if (isActive) {
            interval = window.setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const resetTimer = () => {
        setTime(0);
        setIsActive(false);
    };
    
    const buttonText = isActive ? 'Pause' : (time > 0 ? 'Resume' : 'Start');

    return (
        <>
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-light-base dark:bg-dark-base text-light-text dark:text-dark-text transition-colors duration-300">
                <button 
                    onClick={() => setIsPanelOpen(true)}
                    className="absolute top-6 left-6 p-2 rounded-full text-light-secondary dark:text-dark-secondary hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    aria-label="Open Tools Panel"
                >
                    <Bars3Icon className="w-6 h-6" />
                </button>

                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full text-light-secondary dark:text-dark-secondary hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    aria-label="Exit Flow Mode"
                >
                    <XIcon className="w-6 h-6" />
                </button>

                <div className="text-center flex flex-col items-center">
                     <h1 className="text-3xl md:text-4xl font-light tracking-wider text-light-secondary dark:text-dark-secondary mb-12">
                        {task?.text || 'Focus Session'}
                    </h1>
                    <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center rounded-full border-8 border-black/5 dark:border-white/10">
                        <p className="font-sans font-thin text-7xl md:text-8xl tracking-tight tabular-nums">
                            {formatTime(time)}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Side Panel */}
            <div className={`fixed top-0 left-0 h-full w-full max-w-sm bg-light-card/80 dark:bg-dark-surface/80 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-in-out z-[60] ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 h-full flex flex-col text-light-text dark:text-dark-text">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Flow Tools</h2>
                        <button onClick={() => setIsPanelOpen(false)} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Timer Control</h3>
                        <div className="flex items-center space-x-2">
                             <button 
                                onClick={() => setIsActive(!isActive)}
                                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-current/20 bg-white/50 dark:bg-black/20 hover:bg-current/5 dark:hover:bg-white/5 transition-colors"
                                aria-label={isActive ? "Pause timer" : "Start timer"}
                            >
                                {isActive ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                                <span>{buttonText}</span>
                            </button>
                             <button 
                                onClick={resetTimer}
                                className="p-3 rounded-lg border border-current/20 bg-white/50 dark:bg-black/20 hover:bg-current/5 dark:hover:bg-white/5 transition-colors"
                                aria-label="Reset timer"
                            >
                                <RefreshIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col min-h-0">
                        <h3 className="text-lg font-semibold mb-3">Scratchpad</h3>
                        <textarea
                            value={scratchpadText}
                            onChange={(e) => setScratchpadText(e.target.value)}
                            className="w-full flex-grow p-3 bg-light-base/50 dark:bg-dark-base/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                            placeholder="Jot down your thoughts..."
                        />
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isPanelOpen && (
                <div onClick={() => setIsPanelOpen(false)} className="fixed inset-0 bg-black/20 z-50"></div>
            )}
        </>
    );
};

export default FlowModeOverlay;