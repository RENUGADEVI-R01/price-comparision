//src/components/CompareTable.jsx
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Box,
  Typography,
  Rating,
  CircularProgress,
  Alert
} from '@mui/material';
import { OpenInNew as VisitIcon, Visibility as ViewMoreIcon } from '@mui/icons-material';
import ViewMoreModal from './ViewMoreModal';

const CompareTable = ({ listings }) => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewMore = (listing) => {
    setSelectedListing(listing);
    setModalOpen(true);
  };

  const handleVisit = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getTrustScoreColor = (score) => {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    return 'error';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  if (!listings || listings.length === 0) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No listings available for this product.
      </Alert>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f2aa00' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Website</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rating</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Trust Score</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listings.map((listing, index) => (
              <TableRow key={listing.id || index} hover>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle2" fontWeight="bold">
                      {listing.website_name || listing.site || listing.vendor_name || 'Unknown'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Rating
                      value={typeof listing.rating === 'string' ? (parseFloat(listing.rating) || 0) : (listing.rating || 0)}
                      precision={0.1}
                      size="small"
                      readOnly
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({typeof listing.rating === 'string' ? (parseFloat(listing.rating) || listing.rating) : (listing.rating || 0)})
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${listing.trust_score || 0}/10`}
                    color={getTrustScoreColor(listing.trust_score || 0)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {formatPrice(listing.price || 0)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<VisitIcon />}
                      onClick={() => handleVisit(listing.url || listing.product_url)}
                      sx={{ minWidth: 'auto' }}
                    >
                      Visit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ViewMoreIcon />}
                      onClick={() => handleViewMore(listing)}
                      sx={{ minWidth: 'auto' }}
                    >
                      View More
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ViewMoreModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        listing={selectedListing}
      />
    </>
  );
};

export default CompareTable;
