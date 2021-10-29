export enum ListingStatus {
  completed = "completed",
  listing = "listing",
  cancelled = "cancelled"
}

export interface Listing {
  listing_id: number | null,
  nft_id: string | null,
  nft_asset_name: string | null,
  nft_metadata: string | null,
  buyer_wallet_id: string | null,
  seller_wallet_id: string | null,
  price: number | null,
  current_status: ListingStatus | null,
  seller_contribution: number | null,
  buyer_contribution: number | null,
  creation_time: Date | null,
  buy_or_cancel_time: Date | null,
  un_goal: string | null
}