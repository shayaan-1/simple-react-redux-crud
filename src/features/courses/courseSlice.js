import { createSlice , nanoid } from "@reduxjs/toolkit";

const initialState = {
    courses: [
        {courseid: 1, courseName: 'OOP'},
        {courseid: 2, courseName: 'DSA'},
        {courseid: 3, courseName: 'Database'},
    ]
}

export const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        addCourse : (state,action) => {
            console.log(action?.payload)
            const course = {
                courseid: nanoid(),
                courseName: action.payload
            }
            state.courses.push(course);
        },

        updateCourse: (state, action) => {
            const { courseid, courseName } = action.payload;
            console.log(action.payload)
            const existingCourse = state.courses.find(course => course.courseid == courseid);
            if (existingCourse) {
                existingCourse.courseName = courseName;
            }
        },
        
        deleteCourse: (state, action) => {
            const courseid = action.payload;
            state.courses = state.courses.filter(course => course.courseid !== courseid);
        }
    }
})

export const {addCourse , updateCourse, deleteCourse} = courseSlice.actions;
export default courseSlice.reducer;