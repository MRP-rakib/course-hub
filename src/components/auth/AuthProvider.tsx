'use client'

import { setToken, setUser } from '@/redux/auth/authSlice'
import { FetchAPI } from '@/redux/fetchApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const {token,error} = useAppSelector(state=>state.auth) 
  useEffect(() => {
   const initAuth = async () => {
    if(token){
       const result = await dispatch(
        FetchAPI({
          endpoint: 'api/auth/getuser',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )

      if (FetchAPI.fulfilled.match(result)) {
        dispatch(setUser(result.payload.data))
        return
        
      }
    }
     if(!token){
       const refresh = await dispatch(
        FetchAPI({
          endpoint: 'api/auth/refresh',
          method: 'POST',
        })
      )

      if (!FetchAPI.fulfilled.match(refresh)) {
        return
      }

      const newToken = refresh.payload.token
      dispatch(setToken(newToken))
      const user = await dispatch(
        FetchAPI({
          endpoint: 'api/auth/getuser',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        })
      )

      if (FetchAPI.fulfilled.match(user)) {
        dispatch(setUser(user.payload.data))
        
      }
     }
    }

    initAuth()
    
 
  }, [dispatch,token])
  return <>{children}</>
}

export default AuthProvider