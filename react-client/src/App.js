import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    // Switch,
    Route,
    // Link,
    // Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from './Helper';
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './App.css';
import CreateStudent from './components/CreateStudent';
import ListStudent from './components/ListStudent';
import Login from './components/Login';
import Home from './components/Home';
import CreateCourse from './components/CreateCourse';
import Welcome from './components/Welcome';
import ListCourses from './components/ListCourses';
import ShowCourse from './components/ShowCourse';
import EditCourse from './components/EditCourse';
import ListStudentCourses from './components/ListStudentCourses';

function App() {
    const [isLogin, setIsLogin] = useState(isAuthenticated);
    console.log(isLogin);
    useEffect(() => {}, [isLogin]);
    const deleteCookie = async () => {
        try {
            await axios.get('/signout');
            sessionStorage.clear();
            setIsLogin(false);
            window.location.href = '/';
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Router>
            <Navbar bg='light' expand='lg'>
                <a
                    className='navbar-brand'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarsExampleDefault'
                    aria-controls='navbarsExampleDefault'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    href='https://github.com/giangnguyen13'
                    target='_blank'
                    rel='noopener'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='36'
                        height='36'
                        className='navbar-nav-svg d-inline-block align-text-top'
                        viewBox='0 0 512 499.36'
                        role='img'
                    >
                        <title>GitHub</title>
                        <path
                            fill='currentColor'
                            fillRule='evenodd'
                            d='M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z'
                        ></path>
                    </svg>
                    <small className='d-md-none ms-2'>GitHub</small>
                </a>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href='/home'>Home</Nav.Link>
                        <Nav.Link href='/students'>List of Students</Nav.Link>
                        <Nav.Link href='/courses'>List of Courses</Nav.Link>
                    </Nav>
                    {isLogin ? (
                        <>
                            <Nav.Link
                                href='/signout'
                                onClick={() => deleteCookie()}
                                className='btn btn-outline-primary'
                            >
                                Signout
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link
                                href='/login'
                                className='btn btn-outline-success'
                            >
                                Login
                            </Nav.Link>
                            &nbsp;&nbsp;
                            <Nav.Link
                                href='/create'
                                className='btn btn-outline-primary'
                            >
                                Sign Up
                            </Nav.Link>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
            {!isLogin && (
                <h1 className='text-center'>
                    Hello, You are not logged in yet. Please login
                </h1>
            )}
            <React.Fragment>
                <Route
                    exact
                    render={() => (isLogin ? <Welcome /> : <Home />)}
                    path='/home'
                />
                <Route
                    exact
                    render={() => (isLogin ? <Welcome /> : <Home />)}
                    path='/'
                />
                <Route render={() => <CreateStudent />} path='/create' />
                <Route
                    render={() => <Login setIsLogin={setIsLogin} />}
                    path='/login'
                />
                <Route render={() => <ListStudent />} path='/students' />
                <Route render={() => <CreateCourse />} path='/new_course' />
                <Route render={() => <ListCourses />} path='/courses' />
                <Route
                    render={() => <ListStudentCourses />}
                    path='/studentCourses/:studentId'
                />
                <Route
                    render={() => <ShowCourse />}
                    path='/showcourse/:courseCode'
                />
                <Route
                    render={() => <EditCourse />}
                    path='/editcourse/:courseCode'
                />
            </React.Fragment>
        </Router>
    );
}
export default App;
