import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '../../Components/FloatingButton';


const WriteBlogPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [editId, setEditId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const editBlog = JSON.parse(localStorage.getItem('editBlog') || 'null');
    if (editBlog) {
      setTitle(editBlog.title);
      setBody(editBlog.body);
      setImageUrl(editBlog.imageUrl || '');
      setEditId(editBlog.id);
      localStorage.removeItem('editBlog');
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.value);
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBlog = {
      id: editId || Date.now().toString(),
      title,
      body,
      imageUrl,
    };

    let existingBlogs = JSON.parse(localStorage.getItem('myBlogs') || '[]');

    if (editId) {
      
      existingBlogs = existingBlogs.map((blog: any) => (blog.id === editId ? newBlog : blog));
    } else {
      
      existingBlogs.push(newBlog);
    }

    localStorage.setItem('myBlogs', JSON.stringify(existingBlogs));
    navigate('/myblogs');
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {editId ? 'Edit Blog' : 'Write New Blog'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <TextField
          label="Body"
          value={body}
          onChange={handleBodyChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <TextField
          label="Image URL (optional)"
          value={imageUrl}
          onChange={handleImageUrlChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" color="primary">
          {editId ? 'Update Blog' : 'Save Blog'}
        </Button>
      </form>
      <FloatingButton />
    </Box>
  );
};

export default WriteBlogPage;
