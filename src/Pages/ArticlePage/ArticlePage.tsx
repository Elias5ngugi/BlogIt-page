import React from 'react';
import { Box, Typography, Container, CardMedia } from '@mui/material';
import KDB from '../../../public/KDB.jpg';

const Article: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: '#f9f9f9',
        minHeight: '100vh',
        py: 2,
        overflow: 'auto', 
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: 'white',
            boxShadow: 3,
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Kevin De Bruyne: The Brain Behind Manchester City's Success
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            By Elkido | April 10, 2025
          </Typography>

         
          <CardMedia
            component="img"
            src={KDB}
            alt="Kevin De Bruyne celebrating"
            sx={{
              width: '60%', 
              height: 'auto',
              margin: '0 auto 16px', 
              borderRadius: 2,
            }}
          />

          <Box sx={{ textAlign: 'justify' }}>
            <Typography variant="body1" paragraph>
              In the heart of Manchester City's midfield, Kevin De Bruyne — often called KDB — has been the architect of
              countless victories. Known for his precise vision, passing range, and tactical intelligence, De Bruyne is the
              perfect combination of power and poetry on the pitch.
            </Typography>

            <Typography variant="body1" paragraph>
              His journey wasn't always smooth. After struggling for playtime at Chelsea, many doubted his future. But a
              move to Wolfsburg reignited his spark. City saw his potential and brought him back to the Premier League,
              where he quickly proved he was born for greatness.
            </Typography>

            <Typography variant="body1" paragraph>
              Under Pep Guardiola, KDB blossomed. From splitting defenses with inch-perfect assists to scoring screamers
              from outside the box, he became the pulse of Manchester City's tiki-taka style. Even when injuries struck, his
              resilience brought him back stronger.
            </Typography>

            <Typography variant="body1" paragraph>
              Fans will never forget the 2020–21 season — De Bruyne’s leadership helped secure City’s third Premier League
              title in four years and their first-ever Champions League final appearance. His passion, football IQ, and
              humility make him not just a star, but a legend in the making.
            </Typography>

            <Typography variant="body1" paragraph>
              As Manchester City continues to dominate both locally and in Europe, KDB remains the silent engine — quietly
              dictating play, making magic happen, and reminding us that true greatness often comes without shouting.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Article;
