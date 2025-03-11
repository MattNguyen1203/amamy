/* eslint-disable no-unused-vars */
import {create} from 'zustand'

type Store = {
  stepOrder: number
  setStepOrder: (stepOrderNew: number) => void
}

const useStore = create<Store>()((set) => ({
  stepOrder: 1,
  setStepOrder: (stepOrderNew) => set({stepOrder: stepOrderNew}),
}))

export default useStore
