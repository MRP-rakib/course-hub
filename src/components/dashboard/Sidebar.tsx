import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <div className='bg-red-500 h-screen w-60'>
      <Link href='/dashboard/courses'>courses</Link>
    </div>
  )
}

export default Sidebar