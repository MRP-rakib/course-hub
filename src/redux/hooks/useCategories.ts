import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { setCategories, setError, setLoading } from "../features/categorySlice"
import { supabase } from "@/lib/supabaseClient"

export const useCategories = ()=>{
    const dispatch = useAppDispatch()
    const {categories,error} = useAppSelector(state=>state.category)
    
    useEffect(()=>{
        if(categories.length>0)return
        const fetchCategories = async()=>{
            dispatch(setLoading(true))
            const {data,error}= await supabase.from('categories').select('*').order('name')
            if(error){
                dispatch(setError(error.message))
            } else if(data){
                dispatch(setCategories(data))
            }
             dispatch(setLoading(false))

        }
         fetchCategories()   
    },[dispatch,categories])
return {categories,error}
}