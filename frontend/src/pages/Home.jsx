// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  Compare as CompareIcon
} from '@mui/icons-material';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const navigate = useNavigate();

  const handleProductSelect = (product) => {
    navigate(`/compare/${product.id}`);
  };

  const features = [
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: '#f2aa00' }} />,
      title: 'Smart Search',
      description: 'Find products instantly with our intelligent search that suggests relevant items as you type.'
    },
    {
      icon: <CompareIcon sx={{ fontSize: 40, color: '#f2aa00' }} />,
      title: 'Price Comparison',
      description: 'Compare prices across multiple e-commerce platforms to find the best deals available.'
    },
    {
      icon: <TrendingIcon sx={{ fontSize: 40, color: '#f2aa00' }} />,
      title: 'Real-time Data',
      description: 'Get up-to-date pricing information and availability from trusted online retailers.'
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: '#f2aa00' }} />,
      title: 'Trusted Reviews',
      description: 'Access ratings and reviews to make informed purchasing decisions.'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fffbea' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f2aa00 0%, #e09900 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" fontWeight="bold" mb={3}>
            Find the Best Prices
          </Typography>
          <Typography variant="h5" mb={4} sx={{ opacity: 0.9 }}>
            Compare prices across multiple platforms and save money on your purchases
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
            <SearchBar onProductSelect={handleProductSelect} />
          </Box>

          <Typography variant="body1" sx={{ opacity: 0.8, mb: 2 }}>
            Start by searching for any product you want to compare
          </Typography>

          {/* View Products Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
  variant="outlined"
  onClick={() => navigate('/products')}
  sx={{
    backgroundColor: '#ffffff',   // white background like search bar
    color: '#f2aa00',             // yellow text
    borderColor: '#e0e0e0',       // light gray border to match search bar
    fontWeight: 'bold',
    minHeight: '56px',            // match typical TextField height
    px: 3,
    flexShrink: 0,
    '&:hover': {
      backgroundColor: '#f8f8f8', // mild gray hover
      borderColor: '#d6d6d6',     // subtle border change
      color: '#f2aa00',           // keep text yellow
    },
  }}
>
  View Products
</Button>


          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" fontWeight="bold" mb={6} color="primary">
          Why Choose Our Price Comparison?
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent>
                  <Box mb={2}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" fontWeight="bold" mb={6} color="primary">
            How It Works
          </Typography>
          
          <Grid container spacing={4} alignItems="center">
            {[1, 2, 3].map((step) => {
              const titles = ['Search Products', 'Compare Prices', 'Make Decision'];
              const descs = [
                'Use our smart search to find the product you want to compare across different platforms.',
                'View detailed comparison tables with prices, ratings, and trust scores from multiple vendors.',
                'Choose the best option based on price, delivery options, and customer reviews.'
              ];
              return (
                <Grid item xs={12} md={4} key={step}>
                  <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: '#f2aa00',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {step}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
                      {titles[step - 1]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {descs[step - 1]}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
            Ready to Start Comparing?
          </Typography>
          <Typography variant="h6" mb={4} color="text.secondary">
            Join thousands of smart shoppers who save money every day
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => document.querySelector('input[placeholder="Search for products..."]')?.focus()}
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.1rem',
              backgroundColor: '#f2aa00',
              '&:hover': {
                backgroundColor: '#e09900',
              },
            }}
          >
            Start Searching Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
