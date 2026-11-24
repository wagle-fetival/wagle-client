import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import AuthLayout from '../components/AuthLayout'
import Input from '../components/Input'

type SignupErrors = {
  name?: string
  email?: string
  code?: string
  password?: string
  passwordConfirm?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [errors, setErrors] = useState<SignupErrors>({})

  // 특정 칸의 에러 하나만 지우기
  const clearError = (field: keyof SignupErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  // 이메일 검사: 문제 있으면 에러 문구, 없으면 undefined
  const checkEmail = () => {
    if (!email) return '이메일을 입력해주세요'
    if (!EMAIL_REGEX.test(email)) return '올바르지 않은 이메일이에요'
    return undefined
  }

  // 인증 요청 버튼
  const handleRequestCode = () => {
    const emailError = checkEmail()
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }))
      return
    }

    // TODO: 백엔드 API 나오면 인증 메일 요청
    console.log('인증 요청', email)
    setIsCodeSent(true)
  }

  // 인증번호 확인 버튼
  const handleVerifyCode = () => {
    if (code.length !== 6) {
      setErrors((prev) => ({ ...prev, code: '인증번호 6자리를 입력해주세요' }))
      return
    }

    // TODO: 백엔드 API 나오면 인증번호 확인 요청
    console.log('인증번호 확인', code)
  }

  // 가입하기 전 전체 검사
  const validate = () => {
    const newErrors: SignupErrors = {}

    if (!name) newErrors.name = '이름을 입력해주세요'
    newErrors.email = checkEmail()
    if (!password) newErrors.password = '비밀번호를 입력해주세요'
    if (password !== passwordConfirm) newErrors.passwordConfirm = '비밀번호가 달라요'

    setErrors(newErrors)
    return Object.values(newErrors).every((message) => !message)
  }

  // 가입하기 버튼
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    // TODO: 백엔드 API 나오면 회원가입 요청 후 로그인 페이지로 이동
    console.log('회원가입 시도', { name, email, password })
  }

  return (
    <AuthLayout title="회원가입">
      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <Input
          id="name"
          label="이름"
          placeholder="홍길동"
          value={name}
          error={errors.name}
          onChange={(e) => {
            setName(e.target.value)
            clearError('name')
          }}
        />
        <Input
          id="email"
          label="이메일"
          type="email"
          placeholder="wagle@example.com"
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value)
            clearError('email')
          }}
          action={
            <button
              type="button"
              onClick={handleRequestCode}
              className="shrink-0 rounded-full bg-brown-dark px-4 py-2 text-xs font-bold text-white"
            >
              인증 요청
            </button>
          }
        />

        {/* 인증 요청을 눌렀을 때만 보여줌 */}
        {isCodeSent && (
          <div className="flex flex-col gap-1">
            <Input
              id="code"
              label="인증번호"
              inputMode="numeric"
              maxLength={6}
              placeholder="6자리 코드"
              value={code}
              error={errors.code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, '')) // 숫자만 남김
                clearError('code')
              }}
              action={
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="shrink-0 rounded-full bg-honey px-5 py-2 text-xs font-bold text-brown-dark"
                >
                  확인
                </button>
              }
            />
            {!errors.code && (
              <p className="text-center text-xs text-brown">메일로 받은 인증번호를 입력해주세요</p>
            )}
          </div>
        )}

        <Input
          id="password"
          label="비밀번호"
          type="password"
          placeholder="••••••"
          value={password}
          error={errors.password}
          onChange={(e) => {
            setPassword(e.target.value)
            clearError('password')
          }}
        />
        <Input
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="••••••"
          value={passwordConfirm}
          error={errors.passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value)
            clearError('passwordConfirm')
          }}
        />

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-brown-dark py-2.5 text-sm font-bold text-white shadow"
        >
          가입하기
        </button>
      </form>

      {/* 로그인 링크 */}
      <p className="mt-5 text-center text-sm text-brown-dark">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="font-bold">
          로그인
        </Link>
      </p>
    </AuthLayout>
  )
}

export default SignupPage
