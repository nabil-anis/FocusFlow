import React, { useState } from 'react';
import Card from './Card';

const NotesCard: React.FC = () => {
    const [note, setNote] = useState(
`Project Ideas:
- AI-powered schedule optimization.
- Pomodoro timer with ambient sounds.
- Integration with calendar for smart to-do lists.`
    );

    return (
        <Card title="Scratchpad">
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-full p-2 bg-transparent resize-none text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent rounded-lg text-base leading-relaxed"
                placeholder="Jot down your thoughts..."
            />
        </Card>
    );
};

export default NotesCard;