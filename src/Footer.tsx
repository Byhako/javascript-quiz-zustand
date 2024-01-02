import { Button } from "@mui/material"
import { useQuestionStore } from "./store/questions"

const dataQuestions = () => {
  const questions = useQuestionStore(state => state.questions)
  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer === undefined) { unanswered++ }
    else if (userSelectedAnswer === correctAnswer) { correct++ }
    else { incorrect++ }
  })

  return { correct, incorrect, unanswered }
}


export const Footer = () => {
  const { correct, incorrect, unanswered } = dataQuestions()
  const reset = useQuestionStore(state => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} Correctas - ❌ ${incorrect} Incorrectas - ❔ ${unanswered} Sin responder`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>Reiniciar</Button>
      </div>
    </footer>
  )
}
