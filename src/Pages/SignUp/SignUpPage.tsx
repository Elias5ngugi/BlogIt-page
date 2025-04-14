import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  CssBaseline,
} from '@mui/material';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.username) {
      setError('Please fill in all fields.');
      return;
    }

    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
        });
        setError('');
      } else {
        setError(data.message || 'Signup failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#edf0f5',
        py: 4,
      }}
    >
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 1,
            boxShadow: 2,
            borderRadius: 2,
            bgcolor: '#f9f9f9',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Join a Community of Readers and Writers
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="dense"
              required
              error={!!error && !formData.firstName}
              helperText={error && !formData.firstName ? 'First name is required.' : ''}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="dense"
              required
              error={!!error && !formData.lastName}
              helperText={error && !formData.lastName ? 'Last name is required.' : ''}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="dense"
              required
              error={!!error && !formData.email}
              helperText={error && !formData.email ? 'Email is required.' : ''}
            />
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="dense"
              required
              error={!!error && !formData.username}
              helperText={error && !formData.username ? 'Username is required.' : ''}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="dense"
              required
              error={!!error && !formData.password}
              helperText={error && !formData.password ? 'Password is required.' : ''}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="dense"
              required
              error={!!error && !formData.confirmPassword}
              helperText={error && !formData.confirmPassword ? 'Confirm your password.' : ''}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>
          </Box>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {/* Success Message */}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Account created successfully!
            </Alert>
          )}
          <p>Already have an account? <a href="/login">Log In</a></p>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpPage;
