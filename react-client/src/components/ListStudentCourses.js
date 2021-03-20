import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router-dom';

function ListStudentCourses(props) {
    const { studentId } = props;

    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [listError, setListError] = useState(false);
    const apiUrl = `http://localhost:5000/api/studentCourses/${props.match.params.studentId}`;

    useEffect(() => {
        const fetchData = async () => {
            axios
                .get(apiUrl)
                .then((result) => {
                    console.log('result.data:', result.data);
                    setShowLoading(false);
                    setData(result.data);
                })
                .catch((error) => {
                    console.log('error in fetchData:', error);
                    setListError(true);
                });
        };
        fetchData();
    }, []);

    const showDetail = (id) => {
        console.log(id);
        props.history.push({
            pathname: '/showcourse/' + id,
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
                        onClick={() => {
                            showDetail(item._id);
                        }}
                    >
                        {item.courseName}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default withRouter(ListStudentCourses);
