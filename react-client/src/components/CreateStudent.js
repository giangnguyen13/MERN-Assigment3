import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateStudent(props) {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        address: '',
        city: '',
        phoneNumber: '',
        program: '',
    });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = 'http://localhost:5000/api/';

    const saveUser = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            address: user.address,
            city: user.city,
            phoneNumber: user.phoneNumber,
            program: user.program,
        };
        axios
            .post(apiUrl + 'students', data)
            .then((result) => {
                console.log('in save students');
                setShowLoading(false);
                window.location.href = '/students';
            })
            .catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <Jumbotron>
                <Form onSubmit={saveUser}>
                    <Form.Group>
                        <Form.Label> First Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'
                            value={user.firstName}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Last Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder='Enter last name'
                            value={user.lastName}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='text'
                            name='email'
                            id='email'
                            rows='3'
                            placeholder='Enter email'
                            value={user.email}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Enter password'
                            value={user.password}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            name='address'
                            id='address'
                            placeholder='Enter Address'
                            value={user.address}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type='text'
                            name='city'
                            id='city'
                            placeholder='Enter City'
                            value={user.city}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type='text'
                            name='phoneNumber'
                            id='phoneNumber'
                            placeholder='Enter Phone Number'
                            value={user.phoneNumber}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Program</Form.Label>
                        <Form.Control
                            type='text'
                            name='program'
                            id='program'
                            placeholder='Enter Study Program'
                            value={user.program}
                            onChange={onChange}
                        />
                    </Form.Group>

                    <Button variant='success' type='submit'>
                        Create student account
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );
}

export default CreateStudent;
