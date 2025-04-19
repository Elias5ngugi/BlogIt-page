import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';


const BlogListingPage: React.FC = () => {
  const blogs = [
    {
      id: 1,
      title: 'Kevin De Bruyne: The Brain Behind Manchester City',
      excerpt:
        'Dive into the story of KDB’s journey from Chelsea reject to Manchester City’s midfield maestro...',
    },
    {
      id: 2,
      title: 'The Rise of Young Football Talents in Europe',
      excerpt:
        'Explore how a new wave of footballers under 21 are redefining the beautiful game in Europe...',
    },
    {
      id: 3,
      title: 'The Legend Of Football',
      excerpt:
        'Explore how a new wave of footballers under 21 are redefining the beautiful game in Europe...',
    },
    
  ];

  return (
    <Box
      sx={{
        bgcolor: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 800, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Latest Articles
        </Typography>
        <Box>
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              sx={{
                mb: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: 'white',
                padding: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" paragraph>
                  {blog.excerpt}
                </Typography>
                <Link to={`/article/${blog.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color="primary" fullWidth>
                    Read More →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogListingPage;
