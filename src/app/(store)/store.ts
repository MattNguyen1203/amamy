/* eslint-disable no-unused-vars */
import {create} from 'zustand'

type Store = {
  accessToken: string
  setAccessToken: (accessTokenNew: string) => void
}

const useStore = create<Store>()((set) => ({
  accessToken: '',
  setAccessToken: (accessTokenNew) => set({accessToken: accessTokenNew}),
}))

export default useStore
