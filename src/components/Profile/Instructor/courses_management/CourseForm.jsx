import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Tooltip,
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
        placeholder="Enter course title (200 Max Characters)"
      />
      <TextField
        fullWidth
        label="Short Description"
        name="short_desc"
        value={newCourse.short_desc}
        onChange={handleCourseInputChange}
        margin="normal"
        placeholder="Enter a brief description (100 Max Characters)"
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
        placeholder="Enter detailed description"
      />
      <TextField
        fullWidth
        label="Duration"
        name="duration"
        value={newCourse.duration}
        onChange={handleCourseInputChange}
        margin="normal"
        placeholder="Enter duration in the format HH:MM:SS"
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
        label="Price(NGN)"
        name="price"
        value={newCourse.price}
        onChange={handleCourseInputChange}
        margin="normal"
        placeholder="Enter price in NGN"
      />
      <Tooltip title="Upload an image for the course">
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
      </Tooltip>
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
