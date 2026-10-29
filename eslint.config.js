// ESLint 기본 추천 규칙 (자바스크립트 공통 실수 잡기)
import js from '@eslint/js'
// 브라우저 환경의 전역 변수(window, document 등)를 ESLint에 알려주는 목록
import globals from 'globals'
// React 훅(useState, useEffect 등)을 올바르게 썼는지 검사하는 규칙
import reactHooks from 'eslint-plugin-react-hooks'
// Vite에서 수정 사항이 화면에 바로 반영(HMR)되도록 컴포넌트 작성법을 검사하는 규칙
import reactRefresh from 'eslint-plugin-react-refresh'
// TypeScript 코드를 검사하기 위한 규칙
import tseslint from 'typescript-eslint'
// 추가: Prettier와 겹치는 ESLint 규칙을 꺼주는 설정
import eslintConfigPrettier from 'eslint-config-prettier/flat'
// ESLint 설정을 만들 때 쓰는 도구들
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // dist 폴더(빌드 결과물)는 검사하지 않음
  globalIgnores(['dist']),
  {
    // .ts, .tsx 파일만 검사
    files: ['**/*.{ts,tsx}'],
    // 위에서 불러온 규칙 묶음들을 적용
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      // 추가: 반드시 맨 마지막에 둬야 함
      // 앞의 규칙 중 Prettier와 충돌하는 것들을 마지막에 꺼주는 역할이라서,
      // 중간에 두면 뒤에 오는 규칙이 다시 켜버릴 수 있음
      eslintConfigPrettier,
    ],
    languageOptions: {
      // 브라우저에서 돌아가는 코드라는 걸 알려줌
      globals: globals.browser,
    },
  },
])
