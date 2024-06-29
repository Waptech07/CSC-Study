import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";

const LessonList = ({
  lessons,
  selectedCourse,
  handleDeleteLesson,
  openEditLessonDialog,
}) => {
  return (
    <Box>
      <Typography variant="h5" className="mt-5 mb-2">
        Lessons for
      </Typography>
      {lessons.map((lesson) => (
        <Box
          key={lesson.id}
          className="border border-gray-300 rounded-md p-4 my-2"
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h6">{lesson.title}</Typography>
              <Typography>{lesson.content}</Typography>
            </Grid>
            <Grid item xs={4} className="flex items-center justify-end">
              <Button
                variant="contained"
                onClick={() => openEditLessonDialog(lesson)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteLesson(lesson.id, selectedCourse)}
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

export default LessonList;
