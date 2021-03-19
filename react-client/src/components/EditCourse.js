import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditCourse(props) {
    console.log('editCourse props:', props.match.params);
    const [course, setCourse] = useState({
        _id: '',
        courseCode: '',
        courseName: '',
        section: '',
        semester: '',
    });
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl =
        'http://localhost:5000/api/showcourse/' + props.match.params.courseCode;
    //runs only once after the first render
    useEffect(() => {
        setShowLoading(false);
        //call api
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setCourse(result.data);
            console.log(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const updateCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            courseCode: course.courseCode,
            courseName: course.courseName,
            section: course.section,
            semester: course.semester,
        };
        axios
            .put(apiUrl, data)
            .then((result) => {
                console.log('after calling put to update', result.data);
                console.log(result.data._id);

                setShowLoading(false);
                props.history.push('/showcourse/' + result.data._id);
            })
            .catch((error) => setShowLoading(false));
    };
    //runs when user enters a field
    const onChange = (e) => {
        e.persist();
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <Jumbotron>
                <Form onSubmit={updateCourse}>
                    <Form.Group>
                        <Form.Label> Course Code</Form.Label>
                        <Form.Control
                            type='text'
                            name='courseCode'
                            id='courseCode'
                            placeholder='Enter course code'
                            value={course.courseCode}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Course Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='courseName'
                            id='courseName'
                            placeholder='Enter CourseNname'
                            value={course.courseName}
                            onChange={onChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Semester</Form.Label>
                        <Form.Control
                            type='text'
                            name='semester'
                            id='semester'
                            placeholder='Enter course semester'
                            value={course.semester}
                            onChange={onChange}
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
                        <Form.Group>
                            <Form.Control
                                type='hidden'
                                name='_id'
                                id='_id'
                                value={props.match.params.courseCode}
                            />
                        </Form.Group>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Update Course
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );
}

export default withRouter(EditCourse);
