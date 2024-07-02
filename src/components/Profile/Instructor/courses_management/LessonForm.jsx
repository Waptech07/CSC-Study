import React from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Tooltip,
} from "@mui/material";

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
        Add Lesson to {selectedCourse.title}
      </Typography>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={newLesson.title}
        onChange={handleLessonInputChange}
        margin="normal"
        placeholder="Enter lesson title"
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
        placeholder="Enter lesson content"
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Upload a video file">
            <Button variant="contained" component="label" fullWidth>
              Upload Video
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, "video")}
              />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Upload image files">
            <Button variant="contained" component="label" fullWidth>
              Upload Images
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => handleFileChange(e, "images")}
              />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Upload additional files">
            <Button variant="contained" component="label" fullWidth>
              Upload Files
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => handleFileChange(e, "files")}
              />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Upload document files">
            <Button variant="contained" component="label" fullWidth>
              Upload Documents
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => handleFileChange(e, "documents")}
              />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => handleAddLesson(selectedCourse.id)}
      >
        Add Lesson
      </Button>
    </Box>
  );
};

export default LessonForm;
