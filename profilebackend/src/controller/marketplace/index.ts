import * as express from 'express'
import { StatusCodes } from 'http-status-codes'
import { json } from 'stream/consumers'
import { addNewListing, cancelListingOfId, completeListingOfId, getAllListingsOfStatus, getListingByID, getListingOfBuyer, getListingOfSeller } from '../../database/listingQueries'
import { getUserByUsername } from '../../database/userQueries'
import { ListingStatus } from '../../models/listing'
import { checkIfWalletIdAndUserNameMatch } from '../../ultility/passwordHandler'
export async function getAllCurrentListings(req: express.Request, res: express.Response) {
  try {
    let listings = await getAllListingsOfStatus(ListingStatus.listing)
    res.status(StatusCodes.OK).json({
      listings: listings
    })
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorMessage: error.message
    })
  }
}
export async function getListing(req: express.Request, res: express.Response) {
  try {
    let listing = await getListingByID(Number(req.params.listing_id))
    if (listing == null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "No listing with ID"
      })
    }
    return res.status(StatusCodes.OK).json({
      listing: listing
    })
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorMessage: error.message
    })
  }
}
export async function createListing(req: express.Request, res: express.Response) {
  try{
    if (! await checkIfWalletIdAndUserNameMatch(req.body.seller_wallet_id, res.locals.jwt.username)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errorMessage: "Your username and wallet id does not match! You are not allowed to create listing!"
      })
    }
    await addNewListing({
      listing_id: null,
      nft_id: req.body.nft_id,
      nft_asset_name: req.body.nft_asset_name,
      nft_metadata: req.body.nft_metadata,
      buyer_wallet_id: null,
      seller_wallet_id: req.body.seller_wallet_id,
      price: req.body.price,
      current_status: ListingStatus.listing,
      seller_contribution: null,
      buyer_contribution: null,
      creation_time: new Date(),
      buy_or_cancel_time: null,
      // un_goal: req.body.un_goal, 
    })
    return res.status(StatusCodes.OK).json({
      msg: "Successful Listing!"
    })
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorMessage: error.message
    })
  }
}
export async function getBuyerListing(req: express.Request, res: express.Response) {
  try{
    let listings = await getListingOfBuyer(req.params.buyer_wallet_id)
    return res.status(StatusCodes.OK).json({
      listings: listings
    })
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorMessage: error.message
    })
  }
}

export async function getSellerListing(req: express.Request, res: express.Response) {
  try{
    let listings = await getListingOfSeller(req.params.seller_wallet_id)
    return res.status(StatusCodes.OK).json({
      listings: listings
    })
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorMessage: error.message
    })
  }
}
export async function cancelListing(req: express.Request, res: express.Response) {
  try{
    let listing_id = Number(req.params.listing_id)
    let listing = await getListingByID(listing_id)
    if (listing == null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errorMessage: "Listing does not exist!"
      })
    } 
    if (!await checkIfWalletIdAndUserNameMatch(listing.seller_wallet_id as string, res.locals.jwt.username)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errorMessage: "You cannot cancel a listing that does not belong to you!"
      })
    }
    await cancelListingOfId(listing_id)
    return res.status(StatusCodes.ACCEPTED).json({
      msg: "Successfully cancelled listing!"
    })
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorMessage: error.message
    })
  }
}

export async function completeListing(req: express.Request, res: express.Response) {
  try{
    let listing_id = Number(req.params.listing_id)
    let listing = await getListingByID(listing_id)
    if (listing == null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errorMessage: "Listing does not exist!"
      })
    } 
    if (!await checkIfWalletIdAndUserNameMatch(req.body.buyer_wallet_id, res.locals.jwt.username)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errorMessage: "Your username and wallet id does not match! You are not allowed to buy listing!"
      })
    }
    await completeListingOfId(listing_id, req.body.buyer_wallet_id)
    return res.status(StatusCodes.ACCEPTED).json({
      msg: "Successfully bought listing!"
    })
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorMessage: error.message
    })
  }
}