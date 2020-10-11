import React, { useState } from "react"
import QuestionCard from "./components/QuestionCard"
// Components
import { fetchQuizQuestions } from "./API"
// Types
import { Difficulty, QuestionState } from "./API"

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
      // Save anser in the array of user answers
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

  return (
    <div>
      <h1>Trivia</h1>
      <div className="subtext">Built using React and Typescript</div>
      {isGameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          {isLastQuestion ? `Restart` : `Start`}
        </button>
      ) : null}
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
      {!isGameOver &&
      !isLoading &&
      userAnswers.length === questionArrayPosition + 1 &&
      questionArrayPosition !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  )
}

export default App
