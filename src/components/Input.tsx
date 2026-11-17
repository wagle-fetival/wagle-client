import type { ComponentProps } from 'react'

// 일반 input 태그의 속성(type, value, onChange, placeholder 등) + label, error
type InputProps = ComponentProps<'input'> & {
  label: string
  error?: string // ?: 안 넘겨도 되는 값 (에러 없을 땐 생략)
}

function Input({ label, error, id, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {/* 라벨 + 오른쪽 에러 메시지 */}
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-bold text-brown-dark">
          {label}
        </label>
        {/* error가 있을 때만 보여줌 */}
        {error && <p className="text-xs text-error">! {error}</p>}
      </div>

      {/* ...rest: 나머지 속성(type, value 등)을 input에 그대로 전달 */}
      <input
        id={id}
        className="w-full rounded-full bg-butter px-4 py-2 text-sm text-brown-dark outline-none placeholder:text-brown/50 focus:ring-2 focus:ring-honey"
        {...rest}
      />
    </div>
  )
}

export default Input