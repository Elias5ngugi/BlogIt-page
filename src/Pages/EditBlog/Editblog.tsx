import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState({ title: '', body: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the blog by ID (replace with an actual API call)
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // Replace with actual API call to fetch the blog
        const fetchedBlog = { id, title: 'Existing Blog Title', body: 'Existing Blog Body', imageUrl: '' };
        setBlog(fetchedBlog);
        setLoading(false);
      } catch (err) {
        setError('Failed to load blog.');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Submit the updated blog (replace with actual API call)
    setTimeout(() => {
      alert('Blog updated successfully');
      navigate('/MyBlogs');
    }, 1500);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Blog</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Body"
          value={blog.body}
          onChange={(e) => setBlog({ ...blog, body: e.target.value })}
          multiline
          rows={6}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Update'}
        </Button>
      </form>
    </Box>
  );
};

export default EditBlogPage;
