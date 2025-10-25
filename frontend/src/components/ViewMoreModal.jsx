//src/components/ViewMoreModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
  Grid,
  Paper
} from '@mui/material';
import {
  LocalShipping as DeliveryIcon,
  Undo as ReturnIcon,
  Payment as PaymentIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const ViewMoreModal = ({ open, onClose, listing }) => {
  if (!listing) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getDeliveryDays = () => {
    const days = listing.estimated_delivery_days || listing.delivery_days || '3-5';
    return `${days} days`;
  };

  const isCOD = listing.cod_available || listing.cash_on_delivery || false;
  const isFreeDelivery = listing.free_delivery || listing.free_shipping || false;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }
      }}
    >
      <DialogTitle sx={{ backgroundColor: '#f2aa00', color: 'white' }}>
        <Typography variant="h6" fontWeight="bold">
          {listing.website_name || listing.vendor_name || 'Product Details'}
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Price Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, backgroundColor: '#fffbea' }}>
              <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center">
                {formatPrice(listing.price || 0)}
              </Typography>
            </Paper>
          </Grid>

          {/* Delivery Information */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <DeliveryIcon sx={{ color: '#f2aa00', mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Delivery Information
              </Typography>
            </Box>
            <Box pl={4}>
              <Typography variant="body1" mb={1}>
                <strong>Estimated Delivery:</strong> {getDeliveryDays()}
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body1" mr={1}>
                  <strong>Free Delivery:</strong>
                </Typography>
                <Chip
                  label={isFreeDelivery ? 'Yes' : 'No'}
                  color={isFreeDelivery ? 'success' : 'default'}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {listing.delivery_info || 'Standard delivery available to most locations.'}
              </Typography>
            </Box>
          </Grid>

          {/* Payment Options */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <PaymentIcon sx={{ color: '#f2aa00', mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Payment Options
              </Typography>
            </Box>
            <Box pl={4}>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body1" mr={1}>
                  <strong>Cash on Delivery:</strong>
                </Typography>
                <Chip
                  label={isCOD ? 'Available' : 'Not Available'}
                  color={isCOD ? 'success' : 'default'}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {listing.payment_info || 'Credit/Debit cards, UPI, Net Banking accepted.'}
              </Typography>
            </Box>
          </Grid>

          {/* Return Policy */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center" mb={2}>
              <ReturnIcon sx={{ color: '#f2aa00', mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Return Policy
              </Typography>
            </Box>
            <Box pl={4}>
              <Typography variant="body1" mb={1}>
                <strong>Return Period:</strong> {listing.return_period || '7 days'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {listing.return_policy || 'Easy returns available. Items must be in original condition with tags attached.'}
              </Typography>
            </Box>
          </Grid>

          {/* Additional Information */}
          {(listing.additional_info || listing.notes) && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" mb={2}>
                <ScheduleIcon sx={{ color: '#f2aa00', mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Additional Information
                </Typography>
              </Box>
              <Box pl={4}>
                <Typography variant="body2" color="text.secondary">
                  {listing.additional_info || listing.notes}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
        <Button
          variant="contained"
          onClick={() => window.open(listing.url || listing.product_url, '_blank')}
          sx={{ mr: 1 }}
        >
          Visit Store
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewMoreModal;

