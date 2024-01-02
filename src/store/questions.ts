import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Questions } from '../types'
import confetti from 'canvas-confetti'

interface State {
  questions: Questions[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goPreviousquestion: () => void
  goNextquestion: () => void
  reset: () => void
}

export const useQuestionStore = create<State>()(persist((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async (limit: number) => {
    const res = await fetch('http://localhost:5173/data.json')
    const json = await res.json()

    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions })
  },
  selectAnswer: (questionId: number, answerIndex: number) => {
    const { questions } = get()
    const newQuestions = structuredClone(questions)
    const questionsIndex = newQuestions.findIndex(q => q.id === questionId)
    const questionInfo = newQuestions[questionsIndex]
    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

    if (isCorrectUserAnswer) confetti()

    newQuestions[questionsIndex] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: answerIndex
    }

    set({ questions: newQuestions })
  },
  goNextquestion: () => {
    const { currentQuestion, questions } = get()
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion })
    }
  },
  goPreviousquestion: () => {
    const { currentQuestion } = get()
    const previousQuestion = currentQuestion - 1

    if (previousQuestion > -1) {
      set({ currentQuestion: previousQuestion })
    }
  },
  reset: () => {
    set({ currentQuestion: 0, questions: [] })
  }
}), {
  name: 'questions'
}))
