import './styles.css'

import React, {useState, useEffect, ChangeEvent, useRef} from 'react'
import api from '../../api/search'
import {Button, SearchDropdown} from '../../components'
import {SearchResponse} from '../../types/search'
import {useAuth} from '../../context/AuthContext'
import {compareCaseInsensitive} from '../../utils/string'

const Main = () => {
  const {signOut} = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedItem, setSelectedItem] = useState<string>('')
  const [suggestions, setSuggestions] = useState<SearchResponse>(null)

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions(null)
      return
    }

    if (compareCaseInsensitive(searchTerm, selectedItem)) {
      return
    }

    const timeoutId = setTimeout(() => {
      fetchSuggestions()
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchTerm, selectedItem])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleItemSelect = (item: string) => {
    setSearchTerm(item)
    setSelectedItem(item)
    setSuggestions(null)
  }

  const fetchSuggestions = async () => {
    try {
      setLoading(true)
      const response = await api.search(searchTerm)
      const data = response.data
      setSuggestions(data)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='main'>
      <Button label='Sign Out' onClick={signOut} />
      <SearchDropdown
        data={suggestions}
        dropdownOpen={!compareCaseInsensitive(searchTerm, selectedItem)}
        input={searchTerm}
        loading={loading}
        onInputChange={handleInputChange}
        onSelect={handleItemSelect}
      />
    </div>
  )
}

export default Main
