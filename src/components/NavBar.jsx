import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { motion } from 'framer-motion';

const AppNavbar = () => {
    const location = useLocation();

    return (
        <Navbar isBordered>
            <NavbarContent>
                <NavbarBrand>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="font-bold text-xl">Meme Gallery</Link>
                    </motion.div>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={location.pathname === '/'}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/" className={location.pathname === '/' ? 'text-primary font-medium' : ''}>
                            List View
                        </Link>
                    </motion.div>
                </NavbarItem>
                <NavbarItem isActive={location.pathname === '/list'}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/list" className={location.pathname === '/list' ? 'text-primary font-medium' : ''}>
                            Table View
                        </Link>
                    </motion.div>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default AppNavbar;