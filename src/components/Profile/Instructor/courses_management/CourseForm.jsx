import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

const CourseForm = ({
  newCourse,
  categories,
  handleCourseInputChange,
  handleImageChange,
  handleAddCourse,
}) => {
  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mb: 5 }}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={newCourse.title}
        onChange={handleCourseInputChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Short Description"
        name="short_desc"
        value={newCourse.short_desc}
        onChange={handleCourseInputChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={newCourse.description}
        onChange={handleCourseInputChange}
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        label="Duration"
        name="duration"
        value={newCourse.duration}
        onChange={handleCourseInputChange}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={newCourse.category}
          onChange={handleCourseInputChange}
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
        value={newCourse.price}
        onChange={handleCourseInputChange}
        margin="normal"
      />
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Image
        <input type="file" hidden onChange={handleImageChange} />
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, ml: 2 }}
        onClick={handleAddCourse}
      >
        Add Course
      </Button>
    </Box>
  );
};

export default CourseForm;
