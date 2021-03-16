import React from 'react';
import Button from 'react-bootstrap/Button';

function Welcome() {
    return (
        <div>
            <Button variant='danger' className='btn-lg' href='/signout'>
                Home
            </Button>
            <h1>You are logged in</h1>
        </div>
    );
}

export default Welcome;
