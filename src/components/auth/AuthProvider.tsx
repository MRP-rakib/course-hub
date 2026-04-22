'use client'
import { setUser } from '@/redux/auth/authSlice'
import { FetchAPI } from '@/redux/fetchApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

function AuthProvider({children}:{children:React.ReactNode}) {
    const {token} = useAppSelector(state=>state.auth)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(!token) return
        const getUser = async()=>{
            const result = await dispatch(
                FetchAPI({
                    endpoint:'api/auth/getuser',
                    method:'GET',
                    headers:{'Authorization':`Bearer ${token}`}
                })
            )
            if(FetchAPI.fulfilled.match(result)){
                dispatch(setUser(result.payload.data??result.payload))
            }
        }
        getUser()
    
        
    },[dispatch,token])


  return (
    <>{children}</>
  )
}

export default AuthProvider