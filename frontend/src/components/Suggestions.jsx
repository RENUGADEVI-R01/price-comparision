//src/components/Suggestions.jsx
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import { Lightbulb as SuggestionIcon } from '@mui/icons-material';
import ProductCard from './ProductCard';

const Suggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 3,
          backgroundColor: '#fffbea',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <SuggestionIcon sx={{ color: '#f2aa00', mr: 1, fontSize: 28 }} />
          <Typography variant="h5" fontWeight="bold" color="primary">
            Similar Products You Might Like
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {suggestions.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id || index}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Suggestions;

