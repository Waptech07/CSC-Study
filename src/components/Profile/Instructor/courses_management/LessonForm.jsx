import React from "react";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";

const LessonForm = ({
  newLesson,
  handleLessonInputChange,
  handleFileChange,
  handleAddLesson,
  selectedCourse,
}) => {
  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mb: 5 }}>
      <Typography variant="h5" className="mt-5 mb-2">
        Add Lesson
      </Typography>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={newLesson.title}
        onChange={handleLessonInputChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Content"
        name="content"
        value={newLesson.content}
        onChange={handleLessonInputChange}
        margin="normal"
        multiline
        rows={4}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" component="label" fullWidth>
            Upload Video
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => handleFileChange(e, "video")}
            />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" component="label" fullWidth>
            Upload Images
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => handleFileChange(e, "images")}
            />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" component="label" fullWidth>
            Upload Files
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => handleFileChange(e, "files")}
            />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" component="label" fullWidth>
            Upload Documents
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => handleFileChange(e, "documents")}
            />
          </Button>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => handleAddLesson(selectedCourse)}
      >
        Add Lesson
      </Button>
    </Box>
  );
};

export default LessonForm;
