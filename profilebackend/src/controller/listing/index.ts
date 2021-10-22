import * as express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getAllListingsOfStatus } from '../../database/listingQueries'
import { ListingStatus } from '../../models/listing'
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