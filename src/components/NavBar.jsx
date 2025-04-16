import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';

const AppNavbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'List View' },
        { path: '/list', label: 'Table View' },
    ];

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Navbar isBordered className="w-full bg-white shadow-sm z-50 relative">
            <NavbarContent className="w-full flex justify-between items-center">
                <NavbarBrand>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="font-bold text-xl">Meme Gallery</Link>
                    </motion.div>
                </NavbarBrand>

                <button
                    className="relative w-8 h-8 sm:hidden z-50 flex items-center justify-center"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-[6px]'
                            }`}
                    />
                    <span
                        className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[6px]'
                            }`}
                    />
                </button>

                <div className="hidden sm:flex gap-2">
                    {navLinks.map(({ path, label }) => (
                        <NavbarItem
                            key={path}
                            isActive={location.pathname === path}
                            className="border border-gray-200 rounded-md"
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to={path}
                                    className={`px-3 py-1 block ${location.pathname === path ? 'text-primary font-medium' : ''}`}
                                >
                                    {label}
                                </Link>
                            </motion.div>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="sm:hidden absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md z-40"
                    >
                        <div className="flex flex-col">
                            {navLinks.map(({ path, label }) => (
                                <div
                                    key={path}
                                    className="h-12 border-b border-gray-100 last:border-0 flex items-center"
                                >
                                    <Link
                                        to={path}
                                        className={`flex items-center h-full px-4 w-full ${location.pathname === path ? 'text-primary font-medium' : ''}`}
                                        onClick={closeMenu}
                                    >
                                        {label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Navbar>
    );
};

export default AppNavbar;
