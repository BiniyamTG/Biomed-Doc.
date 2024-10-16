import React, { useState, useEffect } from 'react';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Load comments from local storage when the component mounts
    useEffect(() => {
        const savedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
        setComments(savedComments);
    }, [postId]);

    const handleAddComment = () => {
        if (newComment.trim() === '') return; // Prevent empty comments

        const comment = { text: newComment, timestamp: new Date() };
        const updatedComments = [...comments, comment];
        setComments(updatedComments);
        setNewComment('');

        // Save updated comments to local storage
        localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
    };

    return (
        <div className="comment-section">
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="comment-input"
            />
            <button onClick={handleAddComment} className="comment-button">Post</button>
            <div className="comments-list">
                {comments.map((comment, index) => (
                    <p key={index} className="comment-item">
                        {comment.text} - <small>{new Date(comment.timestamp).toLocaleString()}</small>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
