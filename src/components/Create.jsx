import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addCourse } from '../features/courses/courseSlice';
import * as Yup from 'yup';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  courseName: Yup.string()
    .required('Course name is required')
    .min(3, 'Course name must be at least 3 characters long'),
});

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      courseName: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addCourse(values.courseName));
      resetForm();
      navigate('/');
    },
  });

  return (
    <div>
      <h1>Create a New Course</h1>
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
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default Create;
