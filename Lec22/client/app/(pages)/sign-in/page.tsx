'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInSchema, SignInFormData } from '../validators/Sign-In'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { setCookie } from 'cookies-next'

export default function SignIn() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema)
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await axios.post('http://localhost:3030/auth/sign-in', data)
      const token = response.data.token
      setCookie('token', token)
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign in error:', error)
      alert('Sign in failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account? <a href="/sign-up" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  )
}
