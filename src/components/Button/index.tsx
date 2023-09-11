import './style.css'

import React from 'react'

interface ButtonProps {
  label: string
  onClick: VoidFunction
  type: 'submit' | 'reset' | 'button'
}

const Button: React.FC<ButtonProps> = ({label, onClick, type}) => (
  <button type={type} className='button' onClick={onClick}>
    {label}
  </button>
)

export default Button
