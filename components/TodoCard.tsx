import React, { useState, useEffect } from 'react';
import { type TodoItem } from '../types';
import { PlusIcon, FocusIcon, TrashIcon } from './icons';
import Card from './Card';

interface TodoCardProps {
    onStartFlow: (task: TodoItem) => void;
    setActiveTask: (task: TodoItem) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ onStartFlow, setActiveTask }) => {
    const [todos, setTodos] = useState<TodoItem[]>([
        { id: 1, text: 'Research Methods Assignment', completed: true },
        { id: 2, text: 'Develop React components', completed: false },
        { id: 3, text: 'Integrate Gemini API', completed: false },
    ]);
    const [newTodo, setNewTodo] = useState('');
    const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(null);

    useEffect(() => {
        if (confirmingDeleteId !== null) {
            const timer = setTimeout(() => {
                setConfirmingDeleteId(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [confirmingDeleteId]);

    const toggleTodo = (id: number) => {
        if (confirmingDeleteId === id) return; // Don't toggle if confirming delete
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim()) {
            setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };
    
    const handleFocusClick = (e: React.MouseEvent, todo: TodoItem) => {
        e.stopPropagation();
        setActiveTask(todo);
        onStartFlow(todo);
    };

    const requestDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setConfirmingDeleteId(id);
    }

    const confirmDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setTodos(todos.filter(todo => todo.id !== id));
        setConfirmingDeleteId(null);
    };

    return (
        <Card title="To-Do List">
            <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-3">
                {todos.map(todo => (
                    <div
                        key={todo.id}
                        onClick={() => toggleTodo(todo.id)}
                        className="flex items-center p-3 rounded-lg cursor-pointer transition-colors group hover:bg-light-base dark:hover:bg-dark-base"
                    >
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-4 flex items-center justify-center transition-colors ${todo.completed ? 'bg-light-accent dark:bg-dark-accent border-light-accent dark:border-dark-accent' : 'border-gray-300 dark:border-gray-600'}`}>
                           {todo.completed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`flex-grow ${todo.completed ? 'line-through text-light-secondary dark:text-dark-secondary' : 'text-light-text dark:text-dark-text'}`}>
                            {todo.text}
                        </span>
                        <div className="flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={(e) => handleFocusClick(e, todo)}
                                className="p-1 text-light-secondary dark:text-dark-secondary rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                                aria-label={`Focus on ${todo.text}`}
                            >
                                <FocusIcon className="w-5 h-5" />
                            </button>
                            {confirmingDeleteId === todo.id ? (
                                <button
                                    onClick={(e) => confirmDelete(e, todo.id)}
                                    className="px-2 py-1 text-sm text-red-500 font-semibold rounded-md hover:bg-red-500/10"
                                >
                                    Confirm?
                                </button>
                            ) : (
                                <button 
                                    onClick={(e) => requestDelete(e, todo.id)}
                                    className="p-1 text-light-secondary dark:text-dark-secondary rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                                    aria-label={`Delete ${todo.text}`}
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleAddTodo} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-grow p-3 bg-light-base dark:bg-dark-base border-transparent focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:outline-none rounded-lg transition-colors"
                />
                <button type="submit" className="p-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover-gradient transition-all transform hover:scale-105">
                    <PlusIcon className="w-6 h-6" />
                </button>
            </form>
        </Card>
    );
};

export default TodoCard;