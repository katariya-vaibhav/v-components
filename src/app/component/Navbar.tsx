"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const menuItems = ["Components", "Example", "Colors" , "Me"];

  return (
    <nav className="bg-zinc-950 absolute top-0 w-full border-b-[1px] border-zinc-800 text-white py-4 shadow-lg">
      <div className="px-2 md:px-5 w-full flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          V-components/ui
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden" onClick={toggleMenu}>
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <motion.path
                  initial={{ rotate: 45 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <motion.path
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex md:items-center space-x-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase()}`}
              className="transition duration-300"
            >
              {item}
            </Link>
          ))}
          <a
            href="https://github.com/vaibhav-katariya/v-components"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "15rem" : 0 }}
        className={`overflow-hidden md:hidden transition-height fixed w-full duration-500`}
      >
        <div className="flex flex-col items-start bg-zinc-950 text-white py-2 space-y-2 px-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="w-full py-2 text-left hover:text-yellow-400 transition duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
