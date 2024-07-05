import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizForm from "./QuizForm";

const QuizList = ({
  quizzes,
  handleAddQuiz,
  handleUpdateQuiz,
  handleDeleteQuiz,
  selectedLesson,
}) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleCloseQuizForm = () => {
    setSelectedQuiz(null);
    setIsAdding(false);
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-4 text-center">Quiz</h3>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAdding(true)}
      >
        Add Quiz
      </Button>
      <List>
        {quizzes.map((quiz) => (
          <ListItem
            key={quiz.id}
            onClick={() => handleEditQuiz(quiz)}
            className="cursor-pointer hover:bg-gray-300 rounded-md border"
          >
            <ListItemText
              primary={quiz.title}
              secondary={`Passing Score: ${quiz.passing_score}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteQuiz(selectedLesson.id, quiz.slug)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {(isAdding || selectedQuiz) && (
        <QuizForm
          lessonId={selectedLesson.id}
          quiz={selectedQuiz}
          handleAddQuiz={handleAddQuiz}
          handleUpdateQuiz={handleUpdateQuiz}
          handleClose={handleCloseQuizForm}
        />
      )}
    </div>
  );
};

export default QuizList;
