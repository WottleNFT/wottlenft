import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WalletState {
    connected: boolean, 
    balance: number | undefined,
    address: string | undefined,
}

export interface WalletInfo {
    balance: number,
    address: string,
}

const initialState: WalletState = {
    connected: false,
    balance: undefined,
    address: undefined,
}

export const walletSlice = createSlice({
    name: 'namiWallet',
    initialState,
    reducers: {
        setWalletInfo: (state, action: PayloadAction<WalletInfo>) => {
            state.connected = true;
            state.balance = action.payload.balance;
            state.address = action.payload.address;
        },
        disconnectWallet: (state) => {
            state.connected = false;
            state.balance = undefined;
            state.address = undefined;
        },
    },
});

export const { setWalletInfo, disconnectWallet } = walletSlice.actions

export default walletSlice.reducer