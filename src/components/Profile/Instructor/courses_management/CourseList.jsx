import React from "react";
import { Typography, Box, Button, Grid, Tooltip } from "@mui/material";
import { School } from "@mui/icons-material";

const CourseList = ({
  courses,
  fetchCourseLessons,
  handleDeleteCourse,
  openEditCourseDialog,
}) => {
  return (
    <Box>
      {courses.length === 0 ? (
        <Box className="flex flex-col items-center justify-center py-10">
          <School color="action" style={{ fontSize: 60 }} />
          <Typography variant="h6" className="mt-3">
            No courses available.
          </Typography>
        </Box>
      ) : (
        courses.map((course) => (
          <Box
            key={course.id}
            className="border border-gray-300 rounded-md p-4 my-2"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6">{course.title}</Typography>
                <Typography>{course.short_desc}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                className="flex items-center justify-end"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => fetchCourseLessons(course.id)}
                  sx={{ mr: 1 }}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => openEditCourseDialog(course)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Tooltip title="Delete this course">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CourseList;
