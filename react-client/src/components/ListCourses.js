import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router-dom';

function ListCourses(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [listError, setListError] = useState(false);
    const apiUrl = 'http://localhost:5000/api/courses';

    useEffect(() => {
        const fetchData = async () => {
            axios
                .get(apiUrl)
                .then((result) => {
                    console.log('result.data:', result.data);
                    setShowLoading(false);
                    setData(result.data);
                    //check if the user has logged in
                    // if (result.data.screen !== 'auth') {
                    //     console.log('data in if:', result.data);
                    //     setData(result.data);
                    //     setShowLoading(false);
                    // }
                })
                .catch((error) => {
                    console.log('error in fetchData:', error);
                    setListError(true);
                });
        };
        fetchData();
    }, []);

    const showDetail = (courseCode) => {
        props.history.push({
            pathname: '/listStudentInCourse/' + courseCode,
        });
    };
    
    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <ListGroup>
                {data.map((item, idx) => (
                    <ListGroup.Item
                        key={idx}
                        action
                        onClick={() => { showDetail(item.courseCode)}}
                    >
                        {item.courseName}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default withRouter(ListCourses);

