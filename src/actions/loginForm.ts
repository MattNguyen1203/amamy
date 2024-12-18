'use server'

import {signIn} from '@/auth'

type Values = {
  username: string
  password: string
  redirectTo?: string
}

export const loginForm = async (values: Values) => {
  try {
    const res = await signIn('credentials', {
      redirect: false,
      email: values.username,
      password: values.password,
    })

    if (res?.error) {
      return false
    }

    return true
  } catch (error) {
    console.log('🚀 ~ loginForm ~ error:', error)
    return false
  }
}
