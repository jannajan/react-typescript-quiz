import React from "react"
import { Box, Button, Card } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { baseColor } from "../themes/myTheme"
// Types
import { AnswerObject } from "../App"

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

const useStyles = makeStyles((theme) => ({
  buttonDefault: {
    width: `100%`,
    backgroundColor: `${baseColor.buttonPrimary}!important`,
    "&:hover": {
      backgroundColor: `${baseColor.buttonPrimaryHover}!important`,
    },
  },
  buttonCorrect: {
    width: `100%`,
    backgroundColor: `${baseColor.buttonSecondary}!important`,
    "&:hover": {
      backgroundColor: `${baseColor.buttonSecondaryHover}!important`,
    },
  },
  buttonIncorrect: {
    width: `100%`,
    backgroundColor: `${baseColor.buttonTertiary}!important`,
    "&:hover": {
      backgroundColor: `${baseColor.buttonTertiaryHover}!important`,
    },
  },
}))

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  const classes = useStyles()

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      width="100%"
    >
      <Card>
        <p className="number">
          Question # {questionNumber} of {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
          {answers.map((answer, idx) => {
            const isCorrect = userAnswer?.correctAnswer === answer
            const isClicked = userAnswer?.answer === answer
            let buttonClassName = classes.buttonDefault
            if (isCorrect) {
              buttonClassName = classes.buttonCorrect
            } else if (!isCorrect && isClicked) {
              buttonClassName = classes.buttonIncorrect
            } else {
              buttonClassName = classes.buttonDefault
            }
            console.warn(`###buttonClassName`, buttonClassName)

            return (
              <Box m={2}>
                <Button
                  className={buttonClassName}
                  variant="contained"
                  disabled={userAnswer ? true : false}
                  value={answer}
                  onClick={callback}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </Button>
              </Box>
            )
          })}
        </div>
      </Card>
    </Box>
  )
}

export default QuestionCard
