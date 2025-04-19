import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Authx/AuthContext';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';

const MyProfilePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>(''); 
  const [isEditing, setIsEditing] = useState<boolean>(false); 
  const [error, setError] = useState<string>(''); 

  useEffect(() => {
    
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUsername(response.data.username);
          setEmail(response.data.email);
          setDisplayName(response.data.username); 
        } catch (error) {
          console.error('Error fetching profile:', error);
          setError('Failed to fetch user profile');
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error" mt={4}>
          You need to be logged in to view this page.
        </Typography>
      </Container>
    );
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/user/profile', 
        { username }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Profile updated:', { username });
      setIsEditing(false); 
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile changes');
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing); 
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar sx={{ width: 80, height: 80 }}>
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5" gutterBottom>
            My Profile
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {error && (
          <Typography variant="body2" color="error" mt={2}>
            {error}
          </Typography>
        )}

        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            InputProps={{
              readOnly: !isEditing, 
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            value={email}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />

          {/* Buttons to toggle edit mode and save changes */}
          <Box display="flex" gap={2}>
            <Button variant="contained" color="secondary" onClick={toggleEditMode}>
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>

            {isEditing && (
              <Button variant="contained" color="primary" onClick={saveChanges}>
                Save Changes
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MyProfilePage;
