import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from '@mui/material';
import { Compare as CompareIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCompareClick = () => {
    navigate(`/compare/${product.np_id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image_url || '/placeholder-product.svg'}
        alt={product.product_name}
        sx={{
          objectFit: 'cover',
          backgroundColor: '#f5f5f5',
        }}
        onError={(e) => {
          e.target.src = '/placeholder-product.svg';
        }}
      />

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          component="h3"
          fontWeight="bold"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '3em',
          }}
        >
          {product.product_name}
        </Typography>

        {product.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flexGrow: 1,
            }}
          >
            {product.description}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          startIcon={<CompareIcon />}
          onClick={handleCompareClick}
          sx={{
            mt: 'auto',
            backgroundColor: '#f2aa00',
            '&:hover': {
              backgroundColor: '#e09900',
            },
          }}
        >
          Compare Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
