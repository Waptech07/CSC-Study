import React from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import { School } from "@mui/icons-material";

const LessonList = ({
  lessons,
  selectedCourse,
  selectedLesson,
  setSelectedLesson,
  handleDeleteLesson,
  openEditLessonDialog,
}) => {
  return (
    <Box>
      <Typography variant="h5" className="mt-5 mb-2">
        Lessons for {selectedCourse.title}
      </Typography>
      {lessons.length === 0 ? (
        <Box className="flex flex-col items-center justify-center py-10">
          <School color="action" style={{ fontSize: 60 }} />
          <Typography variant="h6" className="mt-3">
            No lessons available for this course.
          </Typography>
        </Box>
      ) : (
        lessons.map((lesson) => (
          <Box
            key={lesson.id}
            className="border border-gray-300 rounded-md p-4 my-2"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6">{lesson.title}</Typography>
                <Typography>{lesson.content}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                className="flex items-center justify-end"
              >
                <Tooltip title="Manage quiz">
                  <Button
                    variant="contained"
                    color="warning"
                    selected={selectedLesson && selectedLesson.id === lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    Quiz
                  </Button>
                </Tooltip>
                <Button
                  variant="contained"
                  onClick={() => openEditLessonDialog(lesson)}
                  sx={{ mx: 1 }}
                >
                  Edit
                </Button>
                <Tooltip title="Delete this lesson">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      handleDeleteLesson(lesson.id, selectedCourse.id)
                    }
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

export default LessonList;
