'use client'
import { supabase } from '@/lib/supabaseClient'
import { setProfile, setUser } from '@/redux/auth/authSlice'
import { useAppDispatch } from '@/redux/hooks/hooks'
import React, { useEffect } from 'react'

function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        dispatch(setUser(session.user))
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        if (profile) {
          dispatch(setProfile(profile))
        } else {
          dispatch(setUser(null))
          dispatch(setProfile(null))
        }
      } else {
        dispatch(setUser(null))
        dispatch(setProfile(null))
      }
    }
    
    checkSession()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('auth event:', event)
        
        if (session?.user) {
          dispatch(setUser(session.user))
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          if (profile) {
            dispatch(setProfile(profile))
          } else {
            dispatch(setUser(null))
            dispatch(setProfile(null))
          }
        } else {
          dispatch(setUser(null))
          dispatch(setProfile(null))
        }
      }
    )
    
    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch])
  
  return <>{children}</>
}

export default AuthProvider