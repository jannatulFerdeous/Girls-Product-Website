import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import { FiMoon, FiSun } from 'react-icons/fi';
import { LuSearch } from 'react-icons/lu';
import { TfiShoppingCartFull } from 'react-icons/tfi';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/store/logo.png';
import { Cart } from '../cart/Cart';
import { ShopContext } from '../../context/ShopContext';
import './Navbar.css';

export const Navbar = ({ theme, onToggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const { cartItems } = useContext(ShopContext);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const totalQuantity = Object.values(cartItems).reduce((a, b) => a + b, 0);

    return (
        <BootstrapNavbar expand="lg" className={`cart ${scrolled ? "scrolled" : ""}`}>
            <Container>
                <BootstrapNavbar.Brand as={Link} to='/' className='heaven'>
                    <img src={logo} alt="Logo"/>
                    <span>Ecom</span>
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav">
                    <span className='navbar-toggler-icon'></span>
                </BootstrapNavbar.Toggle>
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className='me-auto'>
                        <Nav.Link as={Link} to='/' className={location.pathname === '/' ? 'active navbar-link' : 'navbar-link'}>Home</Nav.Link>
                        <Nav.Link as={Link} to='/shop' className={location.pathname === '/shop' ? 'active navbar-link' : 'navbar-link'}>Shop</Nav.Link>
                        <Nav.Link href='#!' className='navbar-link'>Feature</Nav.Link>
                        <Nav.Link href='#!' className='navbar-link'>Contact</Nav.Link>
                        <Nav.Link href='#!' className='navbar-link'>About</Nav.Link>
                        <Nav.Link href='#!' className='navbar-link'>Blog</Nav.Link>
                    </Nav>
                    <span className='navbar-text'>
                        <InputGroup className='search-input-group'>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Text id="basic-addon2"><LuSearch /></InputGroup.Text>
                        </InputGroup>
                        <button
                            type='button'
                            className='theme-toggle-btn'
                            onClick={onToggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <FiSun /> : <FiMoon />}
                        </button>
                        <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='social-icon'>
                            <span className='iconStyle'><TfiShoppingCartFull /></span>
                            <div className='dot'>{totalQuantity}</div>  
                        </div>
                        <a href="#contact"><button className='vvd'>Register</button></a>
                        <a href="#contact"><button className='vvd'>LogIn</button></a>
                    </span>
                </BootstrapNavbar.Collapse>
            </Container>
            {
                isSidebarOpen &&  <div className='mainCart'>
                    <Cart onClose={() => setIsSidebarOpen(false)} />
                </div>
            }
        </BootstrapNavbar>
    );
};
