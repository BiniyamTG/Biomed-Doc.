// Feed.jsx
import React, { useState, useEffect } from 'react';
import CreatePost from './CreatePost';
import EmojiReactions from './EmojiReactions';
import CommentSection from './CommentSection';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to manage the expanded view of posts
  const [expandedPostIds, setExpandedPostIds] = useState([]);

  // Load posts from localStorage when the component mounts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  // Save posts to localStorage whenever the posts state updates
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleNewPost = (newPost) => {
    const updatedPosts = [...posts, { ...newPost, createdAt: new Date().toISOString() }];
    setPosts(updatedPosts);
  };

  // Toggle the expanded view of the post (show more/less)
  const toggleExpandPost = (postId) => {
    setExpandedPostIds((prevExpanded) =>
      prevExpanded.includes(postId)
        ? prevExpanded.filter((id) => id !== postId)  // Remove from expanded
        : [...prevExpanded, postId]  // Add to expanded
    );
  };

  const filteredPosts = posts.filter((post) =>
    post.caption?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="feed">
      <h2>Post Feed</h2>
      
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <CreatePost onNewPost={handleNewPost} />

      <div className="feed-grid">
        {filteredPosts.length === 0 ? (
          <p>No posts match your search.</p>
        ) : (
          filteredPosts.map((post, index) => {
            const isExpanded = expandedPostIds.includes(index);

            return (
              <div key={index} className={`post-card ${isExpanded ? 'expanded' : ''}`}>
                <h3>@{post.username || 'Anonymous'}</h3>

                {/* Photos */}
                {post.media?.photo && (
                  <div className={`post-images ${isExpanded ? 'expanded' : ''}`}>
                    {post.media.photo.slice(0, isExpanded ? post.media.photo.length : 3).map((photo, photoIndex) => (
                      <img
                        key={photoIndex}
                        src={photo}
                        alt="Uploaded"
                        className="post-image"
                      />
                    ))}
                  </div>
                )}

                {/* Caption */}
                <p>
                  {isExpanded ? post.caption : `${post.caption.slice(0, 100)}...`}
                </p>

                {/* Show more/less button */}
                {((post.caption.length > 100) || (post.media?.photo?.length > 3)) && (
                  <button onClick={() => toggleExpandPost(index)}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </button>
                )}

                <EmojiReactions postId={index} />
                <CommentSection postId={index} />
                <span>{new Date(post.createdAt).toLocaleString()}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Feed;
