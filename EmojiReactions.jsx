import React, { useState, useEffect } from 'react';

const emojiMap = {
    like: '👍',
    love: '❤️',
    laugh: '😂',
};

const EmojiReactions = ({ postId }) => {
    const [reactions, setReactions] = useState(
        Object.fromEntries(Object.keys(emojiMap).map((key) => [key, 0]))
    );

    // Load reactions from local storage when the component mounts
    useEffect(() => {
        const savedReactions = JSON.parse(localStorage.getItem(`reactions_${postId}`)) || {};
        setReactions((prev) => ({ ...prev, ...savedReactions }));
    }, [postId]);

    const handleReaction = (type) => {
        setReactions((prev) => {
            const newReactions = { ...prev, [type]: prev[type] + 1 };
            // Save updated reactions to local storage
            localStorage.setItem(`reactions_${postId}`, JSON.stringify(newReactions));
            return newReactions;
        });
    };

    return (
        <div className="emoji-reactions">
            {Object.entries(emojiMap).map(([type, emoji]) => (
                <button key={type} className="emoji-button" onClick={() => handleReaction(type)}>
                    {emoji} {reactions[type]}
                </button>
            ))}
        </div>
    );
};

export default EmojiReactions;
