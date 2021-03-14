import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    // Switch,
    // Route,
    // Link,
    // Redirect,
} from 'react-router-dom';
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <Router>
            <Navbar bg='light' expand='lg'>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    {isLogin ? (
                        <Nav className='mr-auto'>
                            <Nav.Link href='/home'>Home</Nav.Link>
                            <Nav.Link href='/list'>List of Users</Nav.Link>
                            <Nav.Link href='/listarticles'>
                                List of Articles
                            </Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className='mr-auto'>
                            <Nav.Link href='/home'>Home</Nav.Link>
                            <Nav.Link href='/login'>Login</Nav.Link>
                            <Nav.Link href='/list'>List of Users</Nav.Link>
                            <Nav.Link href='/listarticles'>
                                List of Articles
                            </Nav.Link>
                            <Nav.Link href='/create'>Sign Up</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>

            <div className='aws'>
                <Button variant='danger' className='btn-lg'>
                    Home
                </Button>
                <h1>hello world</h1>
            </div>
        </Router>
    );
}
export default App;
