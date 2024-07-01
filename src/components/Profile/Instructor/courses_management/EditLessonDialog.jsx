import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { InfoRounded } from "@mui/icons-material";

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

  const renderFileList = (files, title) => (
    <>
      <Typography variant="subtitle1">{title}</Typography>
      <List>
        {files.map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file.name || file} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Dialog
      open={Boolean(editLesson)}
      onClose={() => setEditLesson(null)}
      fullWidth
      maxWidth="sm"
    >
      <div className="w-full flex justify-between items-center p-4">
        <DialogTitle>Edit Lesson</DialogTitle>
        <Tooltip title="You have re-upload / upload all media files.">
          <IconButton>
            <InfoRounded />
          </IconButton>
        </Tooltip>
      </div>
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
              {editLesson.video &&
                renderFileList([editLesson.video], "Existing Video")}
              <Grid item xs={12}>
                <Button variant="contained" component="label" fullWidth>
                  Upload Video
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e, "video")}
                  />
                </Button>
              </Grid>
              {Array.isArray(editLesson.images) &&
                editLesson.images.length > 0 &&
                renderFileList(editLesson.images, "Existing Images")}
              <Grid item xs={12}>
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
              {Array.isArray(editLesson.files) &&
                editLesson.files.length > 0 &&
                renderFileList(editLesson.files, "Existing Files")}
              <Grid item xs={12}>
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
              {Array.isArray(editLesson.documents) &&
                editLesson.documents.length > 0 &&
                renderFileList(editLesson.documents, "Existing Documents")}
              <Grid item xs={12}>
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
