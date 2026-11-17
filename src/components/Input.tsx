import type { ComponentProps } from 'react'

// 일반 input 태그의 속성 + label, error
type InputProps = ComponentProps<'input'> & {
  label: string
  error?: string
}

function Input({ label, error, id, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {/* 라벨 */}
      <label htmlFor={id} className="text-sm font-bold text-brown-dark">
        {label}
      </label>

      {/* 입력창 */}
      <input
        id={id}
        className="w-full rounded-full bg-butter px-4 py-2 text-sm text-brown-dark outline-none placeholder:text-brown/50 focus:ring-2 focus:ring-honey"
        {...rest}
      />

      {/* 에러 메시지: 입력창 아래 오른쪽 */}
      {error && <p className="text-right text-xs text-error">! {error}</p>}
    </div>
  )
}

export default Input