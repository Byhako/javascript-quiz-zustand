import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionStore } from './store/questions'
import { Questions } from './types'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'


const getBgColor = (index: number, info: Questions) => {
  const { userSelectedAnswer, correctAnswer } = info

  if (userSelectedAnswer === undefined) { return 'tranparent' }
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
              disabled={info.userSelectedAnswer !== undefined}
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
  const goNextquestion = useQuestionStore(state => state.goNextquestion)
  const goPreviousquestion = useQuestionStore(state => state.goPreviousquestion)
  const info = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousquestion} disabled={currentQuestion === 0}>
          <ArrowBackIos />
        </IconButton>
        {currentQuestion+1} / {questions.length}
        <IconButton onClick={goNextquestion} disabled={currentQuestion >= questions.length-1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={info} />
      <Footer />
    </>
  )
}
