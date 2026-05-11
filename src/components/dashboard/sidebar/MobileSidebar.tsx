'use client'
import { toggleSidebar } from '@/redux/features/sidebar'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { ChevronLeft, ChevronRight } from 'lucide-react'


function MobileSidebar() {
    const {isExpanded} = useAppSelector(state=>state.sidebar)
    const dispatch = useAppDispatch()
  return (
      <div className="flex lg:hidden  bg-[#0a0a0f] items-center">
            <button
              onClick={()=>dispatch(toggleSidebar())}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-110"
            >
              {isExpanded ? (
                <ChevronLeft className="h-3 w-3 lg:h-5 lg:w-5" />
              ) : (
                <ChevronRight className="h-3 w-3 lg:h-5 lg:w-5" />
              )}
            </button>
          </div>
  )
}

export default MobileSidebar