import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateCourse(props) {
    const { studentId } = props;
    const [course, setCourse] = useState({
        courseCode: '',
        courseName: '',
        section: '',
        semester: '',
        creator: studentId,
    });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = 'http://localhost:5000/api/';

    const saveCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            courseCode: course.courseCode,
            courseName: course.courseName,
            section: course.section,
            semester: course.semester,
            creator: course.creator,
        };
        axios
            .post(apiUrl + 'courses', data)
            .then((result) => {
                setShowLoading(false);
                window.location.href = `/studentCourses/${studentId}`;
                //props.history.push('/show/' + result.data._id);
            })
            .catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const onChangeCourseName = (courseCode) => {
        
        let courseNameValue = '';
        switch (courseCode) {
            case 'COMP100':
                courseNameValue = 'Programming 1';
                break;
            case 'COMP123':
                courseNameValue = 'Programming 2';
                break;
            case 'COMP212':
                courseNameValue = 'Programming 3';
                break;
            case 'COMP308':
                courseNameValue = 'Emerging Technologies';
                break;
            case 'COMP303':
                courseNameValue = 'Java EE';
                break;
        }
        return course.courseName = courseNameValue;
    };

    //check if the user already logged-in
    const readCookie = async () => {
        try {
            console.log('--- in readCookie function ---');

            //
            const res = await axios.get('http://localhost:5000/read_cookie');
            //
            console.log(res);
            if (res.data.screen !== undefined) {
                console.log(res.data.screen);
            }
        } catch (e) {
            console.log(e);
        }
    };
    //runs the first time the view is rendered
    //to check if user is signed in
    useEffect(() => {
        readCookie();
    }, []); //only the first render

    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <Jumbotron>
                <Form onSubmit={saveCourse}>
                    <Form.Group>
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control
                            as='select'
                            name='courseCode'
                            id='courseCode'
                            value={course.courseCode}
                            onChange={onChange}
                        >
                            <option value='' disabled>
                                -- Select one --
                            </option>
                            <option value='COMP100'>COMP100</option>
                            <option value='COMP123'>COMP123</option>
                            <option value='COMP212'>COMP212</option>
                            <option value='COMP308'>COMP308</option>
                            <option value='COMP303'>COMP303</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='courseName'
                            id='courseName'
                            placeholder='Select Course Code To Populate Course Name'
                            value={onChangeCourseName(course.courseCode)}
                            onChange={onChange}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Section</Form.Label>
                        <Form.Control
                            as='select'
                            name='section'
                            id='section'
                            value={course.section}
                            onChange={onChange}
                        >
                            <option value='' disabled>
                                -- Select one --
                            </option>
                            <option value='1'>Section 001</option>
                            <option value='2'>Section 002</option>
                            <option value='3'>Section 003</option>
                            <option value='4'>Section 004</option>
                            <option value='5'>Section 005</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Semester</Form.Label>
                        <Form.Control
                            as='select'
                            name='semester'
                            id='semester'
                            placeholder='Enter semester'
                            value={course.semester}
                            onChange={onChange}
                        >
                            <option value='' disabled>
                                -- Select one --
                            </option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='5'>6</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type='hidden'
                            name='creator'
                            id='creator'
                            value={studentId}
                        />
                    </Form.Group>
                    <Button variant='success' type='submit'>
                        Create Course
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );
}

export default CreateCourse;
