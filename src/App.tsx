import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavascriptLogo } from './JavascriptLogo'
import { Start } from './Start'
import { useQuestionStore } from './store/questions'
import { Game } from './Game'

function App() {
  const questions = useQuestionStore(state => state.questions)
  return (
    <main>
      <Container maxWidth='sm' sx={{ marginBottom: '20px' }}>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavascriptLogo />
          <Typography variant='h2' component='h1'>
            Javascript Quizz
          </Typography>
        </Stack>
      </Container>

      {questions.length > 0 ? (
        <Game />
      ) : (
        <Start />
      )}
    </main>
  )
}

export default App
