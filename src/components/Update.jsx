import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCourse } from '../features/courses/courseSlice';
import '../App.css';

const validationSchema = Yup.object({
  courseName: Yup.string()
    .required('Course name is required')
    .min(3, 'Course name must be at least 3 characters long'),
});

const Update = () => {
  const { courseid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);

  const course = courses.find(course => course.courseid == courseid);
  // console.log(course);
  //Component being printed 2 times, optimisation needed.

  const formik = useFormik({
    initialValues: {
      courseName: course ? course.courseName : '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateCourse({ courseid: courseid, courseName: values.courseName }));
      navigate('/');
    },
  });

  return (
    <div>
      <h1>Update Course</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="courseName">Course Name</label>
          <input
            id="courseName"
            name="courseName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.courseName}
          />
          {formik.touched.courseName && formik.errors.courseName ? (
            <div style={{ color: 'red' }}>{formik.errors.courseName}</div>
          ) : null}
        </div>
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default Update;
