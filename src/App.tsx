import React, { useState } from "react"
import QuestionCard from "./components/QuestionCard"
import { Box, Button } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core/styles"
import { myTheme } from "./themes/myTheme"
// Components
import { fetchQuizQuestions } from "./API"
// Types
import { Difficulty, QuestionState } from "./API"
// Styles
import { GlobalStyle, Wrapper } from "./App.styles"

const TOTAL_QUESTIONS = 10
const TRIVIA_DIFFICULTY_LEVEL = Difficulty.EASY

export type AnswerObject = {
  question: string
  answer: string
  isCorrect: boolean
  correctAnswer: string
}

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [questionArrayPosition, setQuestionArrayPosition] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)

  const nextArrayPosition = questionArrayPosition + 1
  const isLastQuestion = nextArrayPosition === TOTAL_QUESTIONS

  console.log(`###`, questions)
  const startQuiz = async () => {
    setIsLoading(true)
    setIsGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      TRIVIA_DIFFICULTY_LEVEL,
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setQuestionArrayPosition(0)
    setIsLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isGameOver) {
      // Get the user's selected answer
      const selectedAnswer = e.currentTarget.value
      // Check answer against correct answer
      const isCorrect =
        questions[questionArrayPosition].correct_answer === selectedAnswer
      // Increment score if correct
      if (isCorrect) {
        setScore((prev) => prev + 1)
      }
      // Save answer in the array of user answers
      const answerObject = {
        question: questions[questionArrayPosition].question,
        answer: selectedAnswer,
        isCorrect,
        correctAnswer: questions[questionArrayPosition].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    if (isLastQuestion) {
      setIsGameOver(true)
    } else {
      setQuestionArrayPosition(nextArrayPosition)
    }
  }

  const renderStartButton = () => {
    if (isGameOver || userAnswers.length === TOTAL_QUESTIONS) {
      return (
        <Box m={2}>
          <Button variant="contained" onClick={startQuiz}>
            {isLastQuestion ? `Restart` : `Start`}
          </Button>
        </Box>
      )
    } else {
      return null
    }
  }

  const renderNextQuestionButton = () => {
    const didUserAnswer = userAnswers.length === questionArrayPosition + 1
    const isLastQuestion = questionArrayPosition === TOTAL_QUESTIONS - 1

    if (!isGameOver && !isLoading && didUserAnswer && !isLastQuestion) {
      return (
        <Box m={2}>
          <Button variant="contained" onClick={nextQuestion}>
            Next Question
          </Button>
        </Box>
      )
    } else {
      return null
    }
  }

  return (
    <ThemeProvider theme={myTheme}>
      <GlobalStyle />
      <Wrapper>
        <h1>Web Trivia</h1>
        <div className="subtext">
          Built using React, Typescript, and Open Trivia DB
        </div>
        {renderStartButton()}
        {!isGameOver && <p className="score">Score: {score}</p>}
        {isLoading ? <p>Loading questions...</p> : null}
        {!isLoading && !isGameOver && (
          <QuestionCard
            questionNumber={questionArrayPosition + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionArrayPosition].question}
            answers={questions[questionArrayPosition].answers}
            userAnswer={
              userAnswers ? userAnswers[questionArrayPosition] : undefined
            }
            callback={checkAnswer}
          />
        )}
        {renderNextQuestionButton()}
      </Wrapper>
    </ThemeProvider>
  )
}

export default App
