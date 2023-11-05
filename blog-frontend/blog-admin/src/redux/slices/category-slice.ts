import { createSlice } from "@reduxjs/toolkit";

interface CategoryState {
    categories: Category[]
}

const initialState: CategoryState = {
    categories: []
}


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    }
})