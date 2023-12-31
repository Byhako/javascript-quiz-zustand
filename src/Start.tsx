import { Button } from "@mui/material"
import { useQuestionStore } from "./store/questions"

const LIMIT_QUESTIONS = 10

export const Start = () => {
  const fetchQuestions = useQuestionStore(state => state.fetchQuestions)

  return (
    <Button
      onClick={() => fetchQuestions(LIMIT_QUESTIONS)}
      variant="contained"
    >Empecemos
    </Button>
  )
}
