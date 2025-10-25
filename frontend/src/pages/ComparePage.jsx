//src/pages/ComparePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Breadcrumbs,
  Link,
  Chip
} from '@mui/material';
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { fetchProductById } from '../services/api';
import CompareTable from '../components/CompareTable';
import Suggestions from '../components/Suggestions';
// import { fetchProductById } from "../services/api";

const ComparePage = () => {
  const { id } = useParams(); // id is np_id
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [listings, setListings] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchProductById(id);
      const { np_id, listings, prices, suggestions } = response.data;

      const firstListing = listings[0];
      const productData = {
        np_id: np_id,
        product_name: firstListing.product_name,
        description: firstListing.description,
        category: firstListing.category,
        sub_category: firstListing.sub_category,
        brand_name: firstListing.brand_name,
        image_url: firstListing.image_url
      };

      setProduct(productData);

      const mappedListings = listings.map((listing) => {
        const priceData = prices.find(p => p.site === listing.site);
        const price = priceData ? Number(priceData.price) : 0;

        return {
          id: listing.id,
          website_name: listing.site,
          url: listing.site_url,
          price: price,
          rating: Number(listing.rating) || 0,
          trust_score: Number(listing.trust_score) || 0,
          free_delivery: listing.free_delivery,
          cash_on_delivery: listing.cash_on_delivery,
          estimated_delivery_days: listing.days_to_deliver,
          return_policy: listing.return_policy,
        };
      });

      setListings(mappedListings);

      const suggestionList = [];
      if (suggestions.suggestion1) {
        try {
          const suggestion1Response = await fetchProductById(suggestions.suggestion1);
          const firstListing = suggestion1Response.data.listings[0];
          suggestionList.push({
            np_id: suggestions.suggestion1,
            product_name: firstListing.product_name,
            description: firstListing.description,
            image_url: firstListing.image_url,
            brand_name: firstListing.brand_name,
            category: firstListing.category,
            sub_category: firstListing.sub_category,
            rating: firstListing.rating,
            trust_score: firstListing.trust_score
          });
        } catch (err) {
          console.error('Error fetching suggestion1:', err);
        }
      }
      if (suggestions.suggestion2) {
        try {
          const suggestion2Response = await fetchProductById(suggestions.suggestion2);
          const firstListing = suggestion2Response.data.listings[0];
          suggestionList.push({
            np_id: suggestions.suggestion2,
            product_name: firstListing.product_name,
            description: firstListing.description,
            image_url: firstListing.image_url,
            brand_name: firstListing.brand_name,
            category: firstListing.category,
            sub_category: firstListing.sub_category,
            rating: firstListing.rating,
            trust_score: firstListing.trust_score
          });
        } catch (err) {
          console.error('Error fetching suggestion2:', err);
        }
      }
      setSuggestions(suggestionList);

    } catch (err) {
      console.error('Error fetching product data:', err);
      setError('Failed to load product information');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress sx={{ color: '#f2aa00' }} size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Product not found
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fffbea' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            component="button"
            variant="body1"
            onClick={handleBackToHome}
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
            Home
          </Link>
          <Typography color="text.primary">Product Comparison</Typography>
        </Breadcrumbs>

        {/* Product Header */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src={product.image_url || '/placeholder-product.svg'}
                alt={product.product_name}
                sx={{
                  width: '100%',
                  height: 300,
                  objectFit: 'cover',
                  borderRadius: 2,
                  backgroundColor: '#f5f5f5',
                }}
                onError={(e) => {
                  e.target.src = '/placeholder-product.svg';
                }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h1" fontWeight="bold" mb={2} color="primary">
                {product.product_name}
              </Typography>

              {product.description && (
                <Typography variant="body1" color="text.secondary" mb={3}>
                  {product.description}
                </Typography>
              )}

              <Box display="flex" alignItems="center" gap={2} mb={3}>
                {product.category && (
                  <Chip
                    label={product.category}
                    color="primary"
                    variant="outlined"
                    sx={{ borderColor: '#f2aa00', color: '#f2aa00' }}
                  />
                )}
                {product.brand_name && (
                  <Chip
                    label={product.brand_name}
                    variant="outlined"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Comparison Table */}
        <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
          Price Comparison
        </Typography>
        <CompareTable listings={listings} />

        {/* Best Deal Recommendation Card */}
        {listings.length > 0 && (() => {
          const bestDeal = listings.reduce((prev, current) => {
            const prevScore = Number(prev.trust_score) || 0;
            const currScore = Number(current.trust_score) || 0;
            return currScore > prevScore ? current : prev;
          });

          const trustScore = Number(bestDeal.trust_score) || 0;
          const price = Number(bestDeal.price) || 0;

          return (
            <Paper
              sx={{
                mt: 4,
                p: 3,
                backgroundColor: '#fff9c4',
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Best Deal Recommendation
              </Typography>
              <Typography variant="body1" mb={2}>
                Best Deal: <strong>{bestDeal.website_name}</strong> offers the most trusted deal with a Trust Score of <strong>{trustScore.toFixed(2)}/10</strong> at ₹<strong>{price.toLocaleString()}</strong>.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={bestDeal.url}
                target="_blank"
              >
                Go to Best Deal
              </Button>
            </Paper>
          );
        })()}

        {/* Suggestions */}
        <Suggestions suggestions={suggestions} />

        {/* Back Button */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToHome}
            size="large"
          >
            Back to Search
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ComparePage;
