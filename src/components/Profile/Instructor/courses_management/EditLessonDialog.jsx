import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

const EditLessonDialog = ({
  editLesson,
  handleUpdateLesson,
  setEditLesson,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fileType) => {
    setEditLesson((prev) => ({
      ...prev,
      [fileType]: Array.from(e.target.files),
    }));
  };

  return (
    <Dialog
      open={Boolean(editLesson)}
      onClose={() => setEditLesson(null)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Lesson</DialogTitle>
      <DialogContent>
        {editLesson && (
          <>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={editLesson.title}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={editLesson.content}
              onChange={handleInputChange}
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
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditLesson(null)}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdateLesson(editLesson)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditLessonDialog;
