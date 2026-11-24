import type { ComponentProps, ReactNode } from 'react'

type InputProps = ComponentProps<'input'> & {
  label: string
  error?: string
  action?: ReactNode // 입력창 오른쪽에 붙일 버튼 (없어도 됨)
}

function Input({ label, error, action, id, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-bold text-brown-dark">
        {label}
      </label>

      {/* 입력창 + 오른쪽 버튼 */}
      <div className="flex items-center gap-2">
        {/* flex-1: 남는 가로 공간 전부 차지, min-w-0: 버튼 있을 때 줄어들 수 있게 */}
        <input
          id={id}
          className="w-full min-w-0 flex-1 rounded-full bg-butter px-4 py-2 text-sm text-brown-dark outline-none placeholder:text-brown/50 focus:ring-2 focus:ring-honey"
          {...rest}
        />
        {action}
      </div>

      {error && <p className="text-right text-xs text-error">! {error}</p>}
    </div>
  )
}

export default Input
