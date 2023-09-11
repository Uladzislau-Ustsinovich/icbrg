import axios from '../utils/axios'
import {SearchResponse} from '../types/search'
import {SEARCH} from '../constants/endpoints'

export default {
  search: (search: string) =>
    axios.post<SearchResponse>(SEARCH.SEARCH, {query: search})
}
