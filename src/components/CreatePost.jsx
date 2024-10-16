// CreatePost.jsx
import React, { useState, useRef } from 'react';

const CreatePost = ({ onNewPost }) => {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState({
    photo: [],
    pdf: null,
    music: null,
    book: null,
    video: null,
  });

  // Refs for hidden file inputs
  const photoInputRef = useRef();
  const pdfInputRef = useRef();
  const musicInputRef = useRef();
  const bookInputRef = useRef();
  const videoInputRef = useRef();

  const handleIconClick = (inputRef) => {
    inputRef.current.click(); // Trigger file input dialog
  };

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      if (name === 'photo') {
        setMedia((prevMedia) => ({
          ...prevMedia,
          [name]: [...(prevMedia.photo || []), ...files], // Handle multiple photos
        }));
      } else {
        setMedia((prevMedia) => ({ ...prevMedia, [name]: files[0] })); // Handle other media types (PDF, etc.)
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!caption) {
      alert('Caption is required.');
      return;
    }

    const newPost = {
      caption,
      media,
      createdAt: new Date().toISOString(),
    };

    onNewPost(newPost);
    setCaption('');
    setMedia({ photo: [], pdf: null, music: null, book: null, video: null });
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Caption (required)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
          className="caption-input"
        />

        <div className="file-inputs">
          <i
            className="fas fa-image icon"
            onClick={() => handleIconClick(photoInputRef)}
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            ref={photoInputRef}
            onChange={handleInputChange}
            multiple // Allow multiple photos
            style={{ display: 'none' }}
          />

          <i
            className="fas fa-file-pdf icon"
            onClick={() => handleIconClick(pdfInputRef)}
          />
          <input
            type="file"
            name="pdf"
            accept=".pdf"
            ref={pdfInputRef}
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />

          <i
            className="fas fa-music icon"
            onClick={() => handleIconClick(musicInputRef)}
          />
          <input
            type="file"
            name="music"
            accept="audio/*"
            ref={musicInputRef}
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />

          <i
            className="fas fa-book icon"
            onClick={() => handleIconClick(bookInputRef)}
          />
          <input
            type="file"
            name="book"
            accept=".epub"
            ref={bookInputRef}
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />

          <i
            className="fas fa-video icon"
            onClick={() => handleIconClick(videoInputRef)}
          />
          <input
            type="file"
            name="video"
            accept="video/*"
            ref={videoInputRef}
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
        </div>

        <button type="submit" className="post-button">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
