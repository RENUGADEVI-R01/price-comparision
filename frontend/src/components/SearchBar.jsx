//src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  CircularProgress,
  Typography
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { searchProducts } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onProductSelect }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length > 2) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const fetchSuggestions = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await searchProducts(searchQuery);
      setSuggestions(response.data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(true);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    setQuery(product.product_name);
    setShowSuggestions(false);
    if (onProductSelect) onProductSelect(product);
    if (product.np_id) {
      navigate(`/compare/${product.np_id}`);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 600, mx: 'auto' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for products..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: '#f2aa00', mr: 1 }} />
          ),
          endAdornment: loading && (
            <CircularProgress size={20} sx={{ color: '#f2aa00' }} />
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        }}
      />

      {/* Filters removed per requirements */}
      
      {showSuggestions && suggestions.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            maxHeight: 300,
            overflow: 'auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <List>
            {suggestions.map((product, index) => (
              <ListItem key={product.np_id || product.id || index} disablePadding>
                <ListItemButton
                  onMouseDown={() => handleProductClick(product)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#fffbea',
                    },
                  }}
                >
                  <ListItemText
                    primary={product.product_name}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {(product.brand || product.brand_name) && `${(product.brand || product.brand_name)} • `}
                          {product.category}
                          {product.sub_category && ` • ${product.sub_category}`}
                        </Typography>
                        {product.rating && (
                          <Typography variant="caption" color="text.secondary">
                            ⭐ {product.rating} • Trust: {product.trust_score}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      
      {showSuggestions && suggestions.length === 0 && !loading && query.length > 2 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            p: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No products found for "{query}"
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
