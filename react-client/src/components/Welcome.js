import React from 'react';
import Button from 'react-bootstrap/Button';

function Welcome(props) {
    const { fullName } = props;
    return (
        <div className='text-center'>
            <h1>Welcome {fullName}</h1>
            <h1>What you want do do?</h1>
            <Button variant='primary' href='/'>
                View my courses
            </Button>
            &nbsp;&nbsp;
            <Button variant='primary' href='/'>
                Add new course
            </Button>
        </div>
    );
}

export default Welcome;
