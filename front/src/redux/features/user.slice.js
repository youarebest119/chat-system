import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: '',
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = {
                ...state.user,
                ...payload,
            }
        }
    },
})

export default userSlice.reducer;
export const { setUser } = userSlice.actions