import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Category{
    id:string
    name:string
    created_at:string
}

interface CategoryState{
    categories:Category[]
    loading:boolean
    error:string|null

}

const initialState:CategoryState={
    categories:[],
    loading:false,
    error:null
}

const categorySlice= createSlice({
    name:'category',
    initialState,
    reducers:{
        setCategories:(state,action:PayloadAction<Category[]>)=>{
         state.categories=action.payload
        },
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.loading= action.payload
        },
        setError:(state,action:PayloadAction<string>)=>{
            state.error = action.payload
            state.loading = false
        },
        clearCategories:(state)=>{
            state.categories=[]
            state.loading=false
            state.error=null
        }

    }
})


export const{setCategories,setLoading,setError,clearCategories} =categorySlice.actions
export default categorySlice.reducer