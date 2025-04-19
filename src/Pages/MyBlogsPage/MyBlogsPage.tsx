import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, CardMedia, Button, Stack,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '../../Components/FloatingButton';

const MyBlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [archivedBlogs, setArchivedBlogs] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('myBlogs') || '[]');
    const storedArchived = JSON.parse(localStorage.getItem('archivedBlogs') || '[]');
    setBlogs(storedBlogs);
    setArchivedBlogs(storedArchived);
  }, []);

  
  const confirmDelete = (id: string) => {
    setSelectedBlogId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirmed = () => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== selectedBlogId);
    setBlogs(updatedBlogs);
    localStorage.setItem('myBlogs', JSON.stringify(updatedBlogs));
    setOpenDialog(false);
    setSnackbarMessage('Blog deleted successfully!');
    setShowSnackbar(true);
  };

  const handleDeleteCancelled = () => {
    setOpenDialog(false);
    setSelectedBlogId(null);
  };

  const handleEdit = (blog: any) => {
    localStorage.setItem('editBlog', JSON.stringify(blog));
    navigate('/write');
  };

  const handleArchive = (id: string) => {
    const blogToArchive = blogs.find((blog) => blog.id === id);
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    const updatedArchived = [...archivedBlogs, blogToArchive];
    setBlogs(updatedBlogs);
    setArchivedBlogs(updatedArchived);
    localStorage.setItem('myBlogs', JSON.stringify(updatedBlogs));
    localStorage.setItem('archivedBlogs', JSON.stringify(updatedArchived));
    setSnackbarMessage('Blog archived!');
    setShowSnackbar(true);
  };

  const handleUnarchive = (id: string) => {
    const blogToRestore = archivedBlogs.find((blog) => blog.id === id);
    const updatedArchived = archivedBlogs.filter((blog) => blog.id !== id);
    const updatedBlogs = [...blogs, blogToRestore];
    setArchivedBlogs(updatedArchived);
    setBlogs(updatedBlogs);
    localStorage.setItem('archivedBlogs', JSON.stringify(updatedArchived));
    localStorage.setItem('myBlogs', JSON.stringify(updatedBlogs));
    setSnackbarMessage('Blog restored from archive!');
    setShowSnackbar(true);
  };

  const renderBlogCard = (blog: any, isArchived = false) => (
    <Card key={blog.id} sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6">{blog.title}</Typography>
        <Typography sx={{ mt: 1 }}>{blog.body}</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          {!isArchived && (
            <>
              <Button variant="contained" color="primary" onClick={() => handleEdit(blog)}>
                Edit
              </Button>
              <Button variant="outlined" color="warning" onClick={() => handleArchive(blog.id)}>
                Archive
              </Button>
              <Button variant="outlined" color="error" onClick={() => confirmDelete(blog.id)}>
                Delete
              </Button>
            </>
          )}
          {isArchived && (
            <Button variant="outlined" color="success" onClick={() => handleUnarchive(blog.id)}>
              Unarchive
            </Button>
          )}
        </Stack>
      </CardContent>
      {blog.imageUrl && (
        <CardMedia
          component="img"
          image={blog.imageUrl}
          alt="blog"
          sx={{ maxHeight: 300, objectFit: 'cover' }}
        />
      )}
    </Card>
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Blogs
      </Typography>

      {blogs.length === 0 ? (
        <Typography>No blogs yet.</Typography>
      ) : (
        blogs.map((blog) => renderBlogCard(blog))
      )}

      {archivedBlogs.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
            Archived Blogs
          </Typography>
          {archivedBlogs.map((blog) => renderBlogCard(blog, true))}
        </>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={openDialog} onClose={handleDeleteCancelled}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancelled}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowSnackbar(false)} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <FloatingButton />
    </Box>
  );
};

export default MyBlogsPage;
