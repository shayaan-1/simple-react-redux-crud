import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../features/courses/courseSlice';

const Home = () => {
  const courses = useSelector(state => state.courses.courses);
  const loggedInUser = useSelector(state => state.auth.loggedInUser);
    // console.log(loggedInUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (record) => {
    if (loggedInUser.role === 'admin') {
      navigate(`/edit/${record.courseid}`);
    }
  };

  const handleDelete = (courseid) => {
    if (loggedInUser.role === 'admin') {
      dispatch(deleteCourse(courseid));
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'courseid',
      key: 'courseid',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    ...(loggedInUser?.role === 'admin' ? [{
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this course?"
            onConfirm={() => handleDelete(record.courseid)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </div>
      ),
    }] : []),
  ];

  return (
    <div>
      <h1>COURSE CATALOGUE</h1>
      <Table dataSource={courses} columns={columns} />
      {loggedInUser?.role === 'admin' && (
        <Button type="primary" onClick={() => navigate('/create')}>
          Add Course
        </Button>
      )}
    </div>
  );
};

export default Home;
