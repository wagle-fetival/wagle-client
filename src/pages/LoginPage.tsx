import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logoIcon from '../assets/logo-icon.svg'
import logoText from '../assets/logo-text.svg'
import Input from '../components/Input'

// 에러 메시지 모양 (둘 다 없을 수도 있음)
type LoginErrors = {
  email?: string
  password?: string
}

// 이메일 형식 검사 규칙 (글자@글자.글자)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginErrors>({})

  // 입력값 검사: 문제 없으면 true, 있으면 에러를 저장하고 false
  const validate = () => {
    const newErrors: LoginErrors = {}

    if (!email) newErrors.email = '이메일을 입력해주세요'
    else if (!EMAIL_REGEX.test(email)) newErrors.email = '올바르지 않은 이메일이에요'

    if (!password) newErrors.password = '비밀번호를 입력해주세요'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // 에러가 0개면 통과
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return // 검사 실패하면 여기서 멈춤

    // TODO: 백엔드 API 나오면 여기서 로그인 요청
    console.log('로그인 시도', { email, password })
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-cream px-4 pt-20">
      {/* 뒤로가기 버튼 */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute left-6 top-6 flex items-center gap-1 rounded-full bg-honey px-4 py-2 text-sm font-semibold text-brown-dark shadow"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        뒤로가기
      </button>

      {/* 로고 */}
      <img src={logoIcon} alt="" className="w-16" />
      <img src={logoText} alt="Wogle" className="mt-1 w-32" />

      {/* 흰 카드 */}
      <div className="mt-6 w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold text-brown-dark">로그인</h1>

        {/* noValidate: 브라우저 기본 경고창 끄고 우리 에러 메시지만 쓰기 */}
        <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
          <Input
            id="email"
            label="이메일"
            type="email"
            value={email}
            error={errors.email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors((prev) => ({ ...prev, email: undefined })) // 다시 입력하면 에러 지우기
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
      </div>
    </div>
  )
}

export default LoginPage