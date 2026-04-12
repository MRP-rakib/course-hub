'use client'

import { GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button'

interface MenuPropsType {
  menu: boolean
  setMenu: (value: boolean) => void
}

function Navbar() {
  const [menu, setMenu] = useState<boolean>(false)

  return (
    <nav className="py-2 md:py-4 px-4 lg:px-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-1">
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Course <span className="text-blue-600">Hub</span>
          </h4>
          <GraduationCap color="blue" size={24} />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-10">
          <li>Home</li>
          <li>Home2</li>
          <li>Home3</li>
          <li>Home4</li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="outline">Sign In</Button>
          <Button variant="primary">Create Account</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenu(true)}
          className="lg:hidden relative p-2"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu menu={menu} setMenu={setMenu} />
    </nav>
  )
}

function MobileMenu({ menu, setMenu }: MenuPropsType) {
  return (
    <div
      className={`fixed inset-0 transition-opacity duration-300 ${
        menu ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >

      {/* Overlay */}
      <div
        onClick={() => setMenu(false)}
        className="absolute inset-0 bg-black/40"
      />

      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          menu ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >

        {/* Top Content */}
        <div className="p-5 flex flex-col gap-8">
          <ul className="flex flex-col gap-6 text-lg font-medium">
            <li className="hover:text-blue-500 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 cursor-pointer">Home2</li>
            <li className="hover:text-blue-500 cursor-pointer">Home3</li>
            <li className="hover:text-blue-500 cursor-pointer">Home4</li>
          </ul>

          <div className="flex flex-col gap-3">
            <Button variant="outline">Sign In</Button>
            <Button variant="primary">Create Account</Button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setMenu(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  )
}

export default Navbar