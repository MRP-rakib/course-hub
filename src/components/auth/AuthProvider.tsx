'use client'

import { supabase } from '@/lib/supabaseClient'
import { setLoading, setProfile, setUser } from '@/redux/auth/authSlice'
import { useAppDispatch } from '@/redux/hooks/hooks'
import React, { useEffect } from 'react'
import type { User } from '@supabase/supabase-js'

function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let isMounted = true

    const syncUser = async () => {
      dispatch(setLoading(true))

      try {
        const { data, error } = await supabase.auth.getUser()

        const user: User | null = data.user

        if (error || !user) {
          if (!isMounted) return
          dispatch(setUser(null))
          dispatch(setProfile(null))
          return
        }

        if (!isMounted) return
        dispatch(setUser(user))

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle()

        if (!isMounted) return

        if (profileError) {
          dispatch(setProfile(null))
        } else {
          dispatch(setProfile(profile ?? null))
        }
      } catch (error: unknown) {
        console.error('Auth sync error:', error)

        if (!isMounted) return
        dispatch(setUser(null))
        dispatch(setProfile(null))
      } finally {
        if (isMounted) dispatch(setLoading(false))
      }
    }

    // initial load
    syncUser()

    // auth state listener (no session usage)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      syncUser()
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [dispatch])


  useEffect(() => {
  const debug = async () => {
    const user = await supabase.auth.getUser()
    const session = await supabase.auth.getSession()

    console.log('USER:', user)
    console.log('SESSION:', session)
    console.log('TOKEN:', localStorage.getItem('supabase-auth-token'))
  }

  debug()
}, [])
  return <>{children}</>
}

export default AuthProvider