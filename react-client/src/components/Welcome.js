import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CreateCourse from './CreateCourse';
import ListCourse from './ListCourse';

function Welcome(props) {
    const { fullName, studentId } = props;
    const [action, setAction] = useState('all');
    const createCourse = () => {
        console.log('in createArticle');
        setAction('create');
    };
    const viewCourses = () => {
        console.log('in viewCourses');
        setAction('list');
    };
    return (
        <div className='text-center'>
            {action === 'create' ? (
                <CreateCourse studentId={studentId} />
            ) : action === 'list' ? (
                <ListCourse />
            ) : (
                <>
                    <h1>Welcome {fullName}</h1>
                    <h1>What you want do do?</h1>
                    <Button variant='primary' onClick={() => viewCourses()}>
                        View my courses
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant='primary' onClick={() => createCourse()}>
                        Add new course
                    </Button>
                </>
            )}
        </div>
    );
}

export default Welcome;
