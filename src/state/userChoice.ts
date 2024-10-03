import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserChoiceState {
    rows: number;
    winLine: number;
}

const initialState: UserChoiceState = {
    rows: 3,
    winLine: 3,
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
    },
});

export const { setRows, setWinLine } = userChoiceSlice.actions;
export default userChoiceSlice.reducer;