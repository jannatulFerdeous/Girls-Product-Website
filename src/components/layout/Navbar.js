import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { LuSearch } from 'react-icons/lu';
import { TfiShoppingCartFull } from 'react-icons/tfi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/store/logo.png';
import { AuthContext } from '../../context/AuthContext';
import { ShopContext } from '../../context/ShopContext';
import './Navbar.css';

export const Navbar = ({ theme, onToggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const { cartItems } = useContext(ShopContext);
    const { currentUser, isAuthenticated, logout } = useContext(AuthContext);

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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearchTerm(params.get('search') || '');
    }, [location.pathname, location.search]);

    const totalQuantity = Object.values(cartItems).reduce((a, b) => a + b, 0);

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const query = searchTerm.trim();
        if (!query) {
            navigate('/shop');
            return;
        }

        navigate(`/shop?search=${encodeURIComponent(query)}`);
    };

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
                        <Nav.Link as={Link} to='/feature' className={location.pathname === '/feature' ? 'active navbar-link' : 'navbar-link'}>Feature</Nav.Link>
                        <Nav.Link as={Link} to='/contact' className={location.pathname === '/contact' ? 'active navbar-link' : 'navbar-link'}>Contact</Nav.Link>
                        <Nav.Link as={Link} to='/about' className={location.pathname === '/about' ? 'active navbar-link' : 'navbar-link'}>About</Nav.Link>
                    </Nav>
                    <span className='navbar-text'>
                        <div className='navbar-search'>
                            <form className='navbar-search__panel' onSubmit={handleSearchSubmit}>
                                <span className='navbar-search__toggle' aria-hidden='true'>
                                    <LuSearch />
                                </span>

                                <div className='search-input-group'>
                                    <Form.Control
                                        type="text"
                                        value={searchTerm}
                                        onChange={(event) => setSearchTerm(event.target.value)}
                                        placeholder="Search skincare, serum, makeup..."
                                        aria-label="Search products"
                                    />
                                    <button type='submit' className='navbar-search__submit'>
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                        <button
                            type='button'
                            className='theme-toggle-btn'
                            onClick={onToggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <FiSun /> : <FiMoon />}
                        </button>
                        <Link to='/cart' className='social-icon' aria-label='Open cart page'>
                            <span className='iconStyle'><TfiShoppingCartFull /></span>
                            <div className='dot'>{totalQuantity}</div>  
                        </Link>
                        {isAuthenticated ? (
                            <div className='auth-nav'>
                                <span className='auth-nav__user'>{currentUser?.name}</span>
                                <button type='button' className='vvd auth-nav__logout' onClick={logout}>
                                    <FiLogOut />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to='/register'><button className='vvd'>Register</button></Link>
                                <Link to='/login'><button className='vvd'>LogIn</button></Link>
                            </>
                        )}
                    </span>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};
