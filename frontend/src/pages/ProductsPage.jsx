// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Paper,
  Button,
  Fab,
  TextField
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    fetchFilters();

    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchProducts();
      const normalizedProducts = res.data.map(p => ({
        ...p,
        category: p.category?.toLowerCase().trim(),
        sub_category: p.sub_category?.toLowerCase().trim(),
        product_name: p.product_name?.toLowerCase().trim(),
        description: p.description?.toLowerCase().trim()
      }));
      setProducts(normalizedProducts);
      setFilteredProducts(normalizedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories & sub-categories
  const fetchFilters = async () => {
    try {
      const res = await fetch('/api/products/filters');
      const data = await res.json();
      setCategories(data.categories.map(c => c.toLowerCase().trim()) || []);
      setSubCategories(
        data.sub_categories.map(sc => ({
          name: sc.name.toLowerCase().trim(),
          parent: sc.parent.toLowerCase().trim()
        })) || []
      );
    } catch (err) {
      console.error('Error fetching filter metadata:', err);
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value.toLowerCase().trim();
    setSelectedCategory(category);
    setSelectedSubCategory('');
    applyFilters(category, '', searchQuery);
  };

  // Handle sub-category change
  const handleSubCategoryChange = (e) => {
    const subCat = e.target.value.toLowerCase().trim();
    setSelectedSubCategory(subCat);
    applyFilters(selectedCategory, subCat, searchQuery);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(selectedCategory, selectedSubCategory, query);
  };

  // Apply all filters together
  const applyFilters = (category, subCat, query) => {
    let filtered = [...products];

    if (category) filtered = filtered.filter(p => p.category === category);
    if (subCat) filtered = filtered.filter(p => p.sub_category === subCat);
    if (query) filtered = filtered.filter(
      p =>
        p.product_name.includes(query) ||
        p.description.includes(query)
    );

    setFilteredProducts(filtered);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress sx={{ color: '#f2aa00' }} size={50} />
    </Box>
  );

  if (error) return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography color="error" variant="h6">{error}</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={fetchAllProducts}>Retry</Button>
    </Container>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fffbea', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
          All Products
        </Typography>

        <Button variant="contained" color="primary" sx={{ mb: 3 }} onClick={() => navigate('/')}>
          Back to Home
        </Button>

        {/* Filter Bar: Search -> Category -> Sub-Category */}
        <Paper sx={{ p: 3, mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ flex: 1, minWidth: 250 }}
          />

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Category</InputLabel>
            <Select value={selectedCategory} label="Category" onChange={handleCategoryChange}>
              <MenuItem value="">All</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Sub-Category</InputLabel>
            <Select value={selectedSubCategory} label="Sub-Category" onChange={handleSubCategoryChange}>
              <MenuItem value="">All</MenuItem>
              {subCategories
                .filter(sc => !selectedCategory || sc.parent === selectedCategory)
                .map(sc => (
                  <MenuItem key={sc.name} value={sc.name}>{sc.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Paper>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <Typography variant="body1">No products found for selected filters.</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.np_id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}

        {showScrollTop && (
          <Fab color="secondary" onClick={scrollToTop} sx={{ position: 'fixed', bottom: 30, right: 30 }}>
            <ArrowUpwardIcon />
          </Fab>
        )}
      </Container>
    </Box>
  );
};

export default ProductsPage;
