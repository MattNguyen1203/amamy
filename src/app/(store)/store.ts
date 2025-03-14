/* eslint-disable no-unused-vars */
import {create} from 'zustand'

type Store = {
  stepOrder: number
  setStepOrder: (stepOrderNew: number) => void
  chatBotMessage: string
  setChatBotMessage: (chatBotMessageNew: string) => void
}

const useStore = create<Store>()((set) => ({
  stepOrder: 1,
  setStepOrder: (stepOrderNew) => set({stepOrder: stepOrderNew}),
  chatBotMessage: '',
  setChatBotMessage: (chatBotMessageNew) =>
    set({chatBotMessage: chatBotMessageNew}),
}))

export default useStore
