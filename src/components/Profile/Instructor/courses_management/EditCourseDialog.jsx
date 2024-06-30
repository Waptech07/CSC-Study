import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const EditCourseDialog = ({
  editCourse,
  categories,
  handleUpdateCourse,
  setEditCourse,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setEditCourse((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  return (
    <Dialog
      open={Boolean(editCourse)}
      onClose={() => setEditCourse(null)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent>
        {editCourse && (
          <>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={editCourse.title}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Short Description"
              name="short_desc"
              value={editCourse.short_desc}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={editCourse.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Duration"
              name="duration"
              value={editCourse.duration}
              onChange={handleInputChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={editCourse.category}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={editCourse.price}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            {editCourse.image && (
              <Typography variant="subtitle1">
                Existing Image:
                <img
                  src={editCourse.image}
                  alt={editCourse.title}
                  className="h-80 w-full"
                />
              </Typography>
            )}
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditCourse(null)}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdateCourse(editCourse)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCourseDialog;
