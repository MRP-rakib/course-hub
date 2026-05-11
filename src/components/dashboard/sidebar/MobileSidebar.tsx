'use client'
import { toggleSidebar } from '@/redux/features/sidebar'
import { useAppDispatch} from '@/redux/hooks/hooks'
import { PanelRightClose } from 'lucide-react'


function MobileSidebar() {
    const dispatch = useAppDispatch()
  return (
      <div className="flex p-2 lg:hidden  bg-[#0a0a0f] items-center">
            <button
              onClick={()=>dispatch(toggleSidebar())}
              className="p-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-110"
            >
             <PanelRightClose size={18} color='violet'/>
            </button>
          </div>
  )
}

export default MobileSidebar