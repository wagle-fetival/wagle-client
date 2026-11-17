import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logoIcon from '../assets/logo-icon.svg'
import logoText from '../assets/logo-text.svg'
import Input from '../components/Input'

function LoginPage() {
  const navigate = useNavigate()

  // 입력값 저장 (useState: 값이 바뀌면 화면을 다시 그려줌)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 로그인 버튼을 눌렀을 때
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // form 기본 동작(페이지 새로고침) 막기
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

        {/* form: 엔터를 쳐도 로그인 버튼이 눌리게 해줌 */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input
            id="email"
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 입력할 때마다 email에 저장
          />
          <Input
            id="password"
            label="비밀번호"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* type="submit": 누르면 form의 onSubmit 실행 */}
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-brown-dark py-2.5 text-sm font-bold text-white shadow"
          >
            로그인 하기
          </button>
        </form>

        {/* 구분선 */}
        <hr className="my-5 border-brown/40" />

        {/* 회원가입 링크 (Link: 새로고침 없이 페이지 이동) */}
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