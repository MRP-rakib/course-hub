'use client'

import { supabase } from '@/lib/supabaseClient'
import {
  setLoading,
  setProfile,
  setUser,
} from '@/redux/auth/authSlice'

import { useAppDispatch } from '@/redux/hooks/hooks'
import React, { useEffect } from 'react'
import type { User } from '@supabase/supabase-js'

function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let isMounted = true

    const syncUser = async (user: User | null) => {
      dispatch(setLoading(true))

      try {
        if (!user) {
          dispatch(setUser(null))
          dispatch(setProfile(null))
          return
        }

        dispatch(setUser(user))

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (isMounted) {
          dispatch(setProfile(profile))
        }
      } catch (error) {
        console.error(error)
      } finally {
        dispatch(setLoading(false))
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      syncUser(data.session?.user ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      syncUser(session?.user ?? null)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [dispatch])

  return <>{children}</>
}

export default AuthProvider