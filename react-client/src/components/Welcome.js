import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CreateCourse from './CreateCourse';
import ListCourses from './ListCourses';
import ListStudentCourses from './ListStudentCourses';
import { withRouter } from 'react-router-dom';

function Welcome(props) {
    const { fullName, studentId } = props;
    const [action, setAction] = useState('all');
    const createCourse = () => {
        console.log('in createArticle');
        setAction('create');
    };
    const viewCourses = (studentId) => {
        console.log('in viewCourses');

        props.history.push({
            pathname: '/studentCourses/' + studentId
          });
  
    };
    return (
        <div className='text-center'>
            {action === 'create' ? (
                <CreateCourse studentId={studentId} />
            ) : (
                <>
                    <h1>Welcome {fullName}</h1>
                    <h1>What you want do do?</h1>
                    <Button variant='primary' onClick={() => viewCourses(studentId)}>
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

export default withRouter(Welcome);

