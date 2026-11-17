import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import logoIcon from '../assets/logo-icon.svg'
import logoText from '../assets/logo-text.svg'

type AuthLayoutProps = {
  title: string // 카드 제목 (로그인, 회원가입)
  children: ReactNode // 카드 안에 들어갈 내용
}

// 로그인·회원가입 공통 틀: 배경 + 뒤로가기 + 로고 + 흰 카드
function AuthLayout({ title, children }: AuthLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-cream px-4 pt-20 pb-10">
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
        <h1 className="text-center text-2xl font-bold text-brown-dark">{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout