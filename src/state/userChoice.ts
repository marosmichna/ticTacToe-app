import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserChoiceState {
    rows: number;
    winLine: number;
    playWithPlayer: boolean;
    playWithComputer: boolean;
}

const initialState: UserChoiceState = {
    rows: 3,
    winLine: 3,
    playWithPlayer: false,
    playWithComputer: false,
};

const userChoiceSlice = createSlice({
    name: "userChoice",
    initialState,
    reducers: {
        setRows(state, action: PayloadAction<number>) {
            state.rows = action.payload;
        },
        setWinLine(state, action: PayloadAction<number>) {
            state.winLine = action.payload;
        },
        setPlayWithPlayer(state, action: PayloadAction<boolean>) {
            state.playWithPlayer = action.payload;
        },
        setPlayWithComputer(state, action: PayloadAction<boolean>) {
            state.playWithComputer = action.payload;
        },
    },
});

export const { setRows, setWinLine, setPlayWithPlayer, setPlayWithComputer } = userChoiceSlice.actions;
export default userChoiceSlice.reducer;