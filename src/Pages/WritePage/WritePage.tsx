import React, { useState } from 'react';
import { useAuth } from '../../Authx/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const WritePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const navigate = useNavigate(); 

  if (!isAuthenticated) {
    
    navigate('/login');
    return null; 
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, body, featuredImage });

    // Submit logic (e.g., send data to the server)
  };

  return (
    <div>
      <h1>Write a Story</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter story title"
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={handleBodyChange}
            placeholder="Write your story here"
            required
          />
        </div>
        <div>
          <label>Featured Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WritePage;
