import './styles.css'

import React from 'react'
import {Continent, Country, Language} from '../../types/search'

interface ComboBoxProps {
  options: Continent[] | Country[] | Language[] | undefined
  onSelect: (item: string) => void
}

const ComboBox: React.FC<ComboBoxProps> = ({label, options, onSelect}) => {
  if (!options) {
    return null
  }

  return (
    <ul className='sub-options-list'>
      <li className='label'>{label}</li>
      {options?.map((option) => (
        <li
          className='item'
          key={option.code}
          onClick={() => onSelect(option.name)}
        >
          {option.name}
        </li>
      ))}
    </ul>
  )
}

export default ComboBox
