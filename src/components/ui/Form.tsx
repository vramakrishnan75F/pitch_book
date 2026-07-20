import type { FormHTMLAttributes, ReactNode } from 'react'

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode
}

function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>
}

export default Form
