import { Course } from "@/types/course"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface CourseState{
    courses:Course[]
    loading:boolean
    error:string|null

}

const initialState:CourseState={
    courses:[],
    loading:false,
    error:null
}

const courseSlice= createSlice({
    name:'course',
    initialState,
    reducers:{
        setCourse:(state,action:PayloadAction<Course[]>)=>{
         state.courses=action.payload
        },
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.loading= action.payload
        },
        setError:(state,action:PayloadAction<string>)=>{
            state.error = action.payload
            state.loading = false
        },
        clearCourse:(state)=>{
            state.courses=[]
            state.loading=false
            state.error=null
        }

    }
})


export const{setCourse,setLoading,setError,clearCourse} =courseSlice.actions
export default courseSlice.reducer