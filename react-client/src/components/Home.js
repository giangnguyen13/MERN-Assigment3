import React from 'react';
import Button from 'react-bootstrap/Button';

function Home() {
    console.log(document.cookie);
    return (
        <div className='text-center'>
            <h1>You are logged in</h1>
            <Button variant='primary' className='btn-lg' href='/login'>
                Login Now
            </Button>
            <h1>New here? </h1>
            <Button variant='success' className='btn-lg' href='/create'>
                Sign up now
            </Button>
        </div>
    );
}

export default Home;
