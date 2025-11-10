import React from 'react';

const Card: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
    <div className={`bg-light-card dark:bg-dark-surface rounded-4xl shadow-light dark:shadow-dark p-6 flex flex-col ${className}`}>
        <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">{title}</h2>
        {children}
    </div>
);

export default Card;
