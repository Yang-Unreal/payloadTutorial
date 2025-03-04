'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SubmitButton from '../../_components/SubmitButton'
import { login, LoginResponse } from '../_actions/login'

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const result: LoginResponse = await login({ email, password })

    setIsPending(false)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error occurred. Please try again.')
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center items-center">
      <div className="text-3xl">Login</div>
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="w-full textInput"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2 mb-8">
            <label htmlFor="password">Password</label>
            <input
              className="w-full textInput"
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <SubmitButton loading={isPending} text="Login" />
        </form>
      </div>
    </div>
  )
}
