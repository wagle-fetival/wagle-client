import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import AuthLayout from '../components/AuthLayout'
import Input from '../components/Input'

type LoginErrors = {
  email?: string
  password?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginErrors>({})

  // 입력값 검사: 문제 없으면 true
  const validate = () => {
    const newErrors: LoginErrors = {}

    if (!email) newErrors.email = '이메일을 입력해주세요'
    else if (!EMAIL_REGEX.test(email)) newErrors.email = '올바르지 않은 이메일이에요'

    if (!password) newErrors.password = '비밀번호를 입력해주세요'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    // TODO: 백엔드 API 나오면 여기서 로그인 요청
    console.log('로그인 시도', { email, password })
  }

  return (
    <AuthLayout title="로그인">
      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <Input
          id="email"
          label="이메일"
          type="email"
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value)
            setErrors((prev) => ({ ...prev, email: undefined }))
          }}
        />
        <Input
          id="password"
          label="비밀번호"
          type="password"
          placeholder="••••••"
          value={password}
          error={errors.password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrors((prev) => ({ ...prev, password: undefined }))
          }}
        />

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-brown-dark py-2.5 text-sm font-bold text-white shadow"
        >
          로그인 하기
        </button>
      </form>

      {/* 구분선 */}
      <hr className="my-5 border-brown/40" />

      {/* 회원가입 링크 */}
      <p className="text-center text-sm text-brown-dark">
        회원이 아니신가요?{' '}
        <Link to="/signup" className="font-bold">
          회원가입
        </Link>
      </p>
    </AuthLayout>
  )
}

export default LoginPage