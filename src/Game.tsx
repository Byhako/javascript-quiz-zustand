import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionStore } from './store/questions'
import { Questions } from './types'


const getBgColor = (index: number, info: Questions) => {
  const { userSelectedAnswer, correctAnswer } = info

  if (!userSelectedAnswer) { return 'transparent' }
  if (index === correctAnswer) { return 'green' }
  if (index === userSelectedAnswer) { return 'red' }

  return 'transparent'
}


const Question = ({ info }: { info: Questions }) => {
  const selectAnswer = useQuestionStore(state => state.selectAnswer)

  const handleClic = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ textAlign: 'left', p: 2, bgcolor: '#222' }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntaxHighlighter language='javascript' style={atomOneDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, idx) => (
          <ListItem key={idx} disablePadding divider>
            <ListItemButton
              disabled={!!info.userSelectedAnswer}
              onClick={handleClic(idx)}
              sx={{ bgcolor: getBgColor(idx, info) }}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}


export const Game = () => {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestion = useQuestionStore(state => state.currentQuestion)
  const info = questions[currentQuestion]

  return (
    <>
      <Question info={info} />
    </>
  )
}
