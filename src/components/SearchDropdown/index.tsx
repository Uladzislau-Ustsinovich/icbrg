import './styles.css'

import React, {ChangeEvent} from 'react'
import {SEARCH_KEYS, SearchResponse} from '../../types/search'
import {ComboBox} from '../'

interface SearchDropdownProps {
  data: SearchResponse
  dropdownOpen: boolean
  input: string
  loading: boolean
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSelect: (item: string) => void
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  data,
  dropdownOpen,
  input,
  loading,
  onInputChange,
  onSelect
}) => {
  return (
    <div className={'search-container'}>
      <input
        type='text'
        placeholder='Search...'
        value={input}
        onChange={onInputChange}
      />
      {loading ? (
        <ComboBox options={[]} label={'Loading...'} />
      ) : (
        <div className='options-list'>
          {dropdownOpen &&
            Object.values(SEARCH_KEYS).map((key) => (
              <ComboBox
                options={data && data[key]}
                label={key}
                onSelect={onSelect}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default SearchDropdown
