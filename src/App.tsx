// react-router-dom에서 필요한 도구들 가져오기
// BrowserRouter: 주소(URL)가 바뀌는 걸 감지하는 가장 바깥 틀
// Routes: 여러 Route 중에서 지금 주소에 맞는 하나만 골라서 보여주는 상자
// Route: "이 주소면 이 페이지를 보여줘"라는 규칙 한 줄
// Navigate: 다른 주소로 자동으로 이동시키는 컴포넌트
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// 우리가 만든 페이지 가져오기
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

// 앱의 가장 바깥 컴포넌트
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 페이지가 아직 없어서, 첫 주소(/)로 들어오면 로그인으로 보냄 */}
        {/* 메인 페이지가 만들어지면 이 줄을 메인 페이지로 바꾸면 됨 */}
        {/* replace: 뒤로가기 눌렀을 때 /로 다시 돌아오지 않게 기록을 덮어씀 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 주소가 /login이면 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 주소가 /signup이면 회원가입 페이지 */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

// main.tsx에서 App을 가져다 쓸 수 있게 내보내기
export default App
