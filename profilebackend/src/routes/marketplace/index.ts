import { createListing, getAllCurrentListings, getBuyerListing, getListing, getSellerListing } from "../../controller/marketplace";

const express = require('express');
const marketplaceRouter = express.Router();

marketplaceRouter.get('/all/current', getAllCurrentListings);
marketplaceRouter.get('/:listing_id', getListing)
marketplaceRouter.post('/listing', createListing)
marketplaceRouter.get('/listings/seller/:seller_wallet_id', getSellerListing);
marketplaceRouter.get('/listings/buyer/:buyer_wallet_id', getBuyerListing);
export default marketplaceRouter