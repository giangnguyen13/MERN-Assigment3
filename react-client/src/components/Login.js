import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Welcome from './Welcome';
function Login(props) {
    //state variable for the screen, admin or user
    const [screen, setScreen] = useState('auth');
    //store input field data, user name and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();

    const apiUrl = 'http://localhost:3000/signin';
    //send username and password to the server
    // for initial authentication
    const auth = async () => {
        console.log('calling auth');
        try {
            //make a get request to /authenticate end-point on the server
            const loginData = { auth: { email, password } };
            //call api
            const res = await axios.post(apiUrl, loginData);
            //process the response
            if (res.data.screen !== undefined) {
                sessionStorage.setItem('fullname', res.data.screen);
                sessionStorage.setItem('studentId', res.data.studentId);
                props.setIsLogin(true);
                window.location.href = '/home';
            }
        } catch (e) {
            //print the error
            console.log(e);
        }
    };

    //check if the user already logged-in
    const readCookie = async () => {
        try {
            console.log('--- in readCookie function ---');

            //
            const res = await axios.get('/read_cookie');
            //
            if (res.data.screen !== undefined) {
                setScreen(res.data.screen);
                console.log(res.data.screen);
            }
        } catch (e) {
            setScreen('auth');
            console.log(e);
        }
    };
    //runs the first time the view is rendered
    //to check if user is signed in
    useEffect(() => {
        readCookie();
    }, []); //only the first render
    //
    return (
        <>
            {screen === 'auth' ? (
                <Jumbotron>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            id='email'
                            placeholder='example@example.ca'
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            id='password'
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button variant='primary' type='submit' onClick={auth}>
                        Create student account
                    </Button>
                </Jumbotron>
            ) : (
                <Welcome />
            )}
        </>
    );
}

export default Login;
