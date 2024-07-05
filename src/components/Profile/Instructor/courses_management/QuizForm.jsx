import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const QuizForm = ({
  lessonId,
  quiz,
  handleAddQuiz,
  handleUpdateQuiz,
  handleClose,
}) => {
  const [quizData, setQuizData] = useState({
    title: "",
    passing_score: "",
    questions: [
      {
        content: "",
        answers: [
          { content: "", is_correct: false },
          { content: "", is_correct: false },
          { content: "", is_correct: false },
          { content: "", is_correct: false },
        ],
      },
    ],
  });

  useEffect(() => {
    if (quiz) {
      setQuizData(quiz);
    }
  }, [quiz]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][name] = value;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleAnswerChange = (qIndex, aIndex, e) => {
    const { name, value, type, checked } = e.target;
    const updatedQuestions = [...quizData.questions];
    const updatedAnswers = [...updatedQuestions[qIndex].answers];
    updatedAnswers[aIndex] = {
      ...updatedAnswers[aIndex],
      [name]: type === "checkbox" ? checked : value,
    };
    updatedQuestions[qIndex].answers = updatedAnswers;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleAddQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          content: "",
          answers: [
            { content: "", is_correct: false },
            { content: "", is_correct: false },
            { content: "", is_correct: false },
            { content: "", is_correct: false },
          ],
        },
      ],
    }));
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleSubmit = async () => {
    if (quiz) {
      await handleUpdateQuiz(lessonId, quiz.slug, quizData);
    } else {
      await handleAddQuiz(lessonId, quizData);
    }
    handleClose();
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>{quiz ? "Edit Quiz" : "Add Quiz"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={quizData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Passing Score"
          name="passing_score"
          value={quizData.passing_score}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        {quizData.questions.map((question, qIndex) => (
          <div key={qIndex}>
            <TextField
              label={`Question ${qIndex + 1}`}
              name="content"
              value={question.content}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              fullWidth
              margin="normal"
            />
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex}>
                <TextField
                  label={`Answer ${aIndex + 1}`}
                  name="content"
                  value={answer.content}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                  fullWidth
                  margin="normal"
                />
                <label>
                  <Checkbox
                    name="is_correct"
                    checked={answer.is_correct}
                    onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                  />
                  Correct
                </label>
              </div>
            ))}
            <IconButton onClick={() => handleRemoveQuestion(qIndex)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button onClick={handleAddQuestion}>Add Question</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          {quiz ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizForm;
