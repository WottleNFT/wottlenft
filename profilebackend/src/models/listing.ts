export enum ListingStatus {
  completed = "completed",
  listing = "listing",
  cancelled = "cancelled"
}

export interface Listing {
  listing_id: number | null,
  nft_id: string | null,
  buyer_wallet_id: string | null,
  seller_wallet_id: string | null,
  price: number | null,
  current_status: ListingStatus | null
}