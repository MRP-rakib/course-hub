"use client";

import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "../lib/MenuItem";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuPropsType } from "../utils/types/MenuPropsTYpe";

function Navbar() {
  const [menu, setMenu] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <nav className="py-2 md:py-4 px-4 lg:px-0 border-b border-gray-200">
      <div className=" flex items-center gap-1">
        <button
          onClick={() => setMenu(true)}
          className="lg:hidden relative p-2"
        >
          <Menu size={24} />
        </button>
        <div className=" max-w-7xl mx-auto flex px-4 items-center w-full justify-between">
          <Link href="/" className="flex items-center gap-1">
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Course <span className="text-blue-600">Hub</span>
          </h4>
          <GraduationCap color="blue" size={24} />
        </Link>
        <ul className="hidden lg:flex items-center gap-10">
          {MenuItem.map((menu, index) => (
            <li
              key={index}
              className={`text-md capitalize ${pathname === menu.path && "text-blue-500 font-medium underline underline-offset-2"}`}
            >
              <Link href={menu.path}>{menu.name}</Link>
            </li>
          ))}
        </ul>
        
          
            <Link href='/join'  className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] md:text-[14px] lg:text-base font-semibold px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              Join Now
            </Link>
        </div>
          
        
      </div>
      <MobileMenu menu={menu} setMenu={setMenu} pathname={pathname} />
    </nav>
  );
}

function MobileMenu({ menu, setMenu, pathname }: MenuPropsType) {
  return (
    <div
      className={`fixed inset-0 transition-opacity duration-300 ${
        menu ? "opacity-100 visible" : "opacity-0 invisible"
      } lg:hidden`}
    >
      <div
        onClick={() => setMenu(false)}
        className="absolute inset-0 bg-black/40"
      />

      <div
        className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          menu ? "translate-x-0" : "-translate-x-full"
        } flex flex-col justify-between`}
      >
        <div className="p-5 flex flex-col gap-8">
          <ul className="flex flex-col lg:hidden gap-10">
            {MenuItem.map((menu, index) => (
              <li
                key={index}
                className={`text-md capitalize ${pathname === menu.path && "text-blue-500 font-medium underline underline-offset-2"}`}
              >
                <Link href={menu.path}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setMenu(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
