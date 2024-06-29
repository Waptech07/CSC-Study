import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";

const CourseList = ({
  courses,
  fetchCourseLessons,
  handleDeleteCourse,
  openEditCourseDialog,
}) => {
  return (
    <Box>
      {courses.map((course) => (
        <Box
          key={course.id}
          className="border border-gray-300 rounded-md p-4 my-2"
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h6">{course.title}</Typography>
              <Typography>{course.short_desc}</Typography>
            </Grid>
            <Grid item xs={4} className="flex items-center justify-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => fetchCourseLessons(course.id)}
                sx={{ mr: 1 }}
              >
                View Lessons
              </Button>
              <Button
                variant="contained"
                onClick={() => openEditCourseDialog(course)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteCourse(course.id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default CourseList;
