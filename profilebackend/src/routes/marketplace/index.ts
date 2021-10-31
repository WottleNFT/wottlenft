import { cancelListing, completeListing, createListing, getAllCurrentListings, getBuyerListing, getListing, getSellerListing } from "../../controller/marketplace";
import { extractJWT } from "../../ultility/passwordHandler";

const express = require('express');
const marketplaceRouter = express.Router();

marketplaceRouter.get('/all/current', getAllCurrentListings);
marketplaceRouter.get('/:listing_id', getListing)
/*{
  body{
    nft_id
    nft_asset_name
    seller_wallet_id
    price
  }
}*/
marketplaceRouter.post('/listing', extractJWT, createListing)
marketplaceRouter.get('/listings/seller/:seller_wallet_id', getSellerListing);
marketplaceRouter.get('/listings/buyer/:buyer_wallet_id', getBuyerListing);
marketplaceRouter.put('/cancel/:listing_id',extractJWT, cancelListing)
/* 
{
  body{
    buyer_wallet_id
  }
}
*/
marketplaceRouter.put('/complete/:listing_id',extractJWT, completeListing)
export default marketplaceRouter