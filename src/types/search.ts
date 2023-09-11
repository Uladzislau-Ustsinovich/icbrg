export interface Continent {
  code: string
  name: string
}

export interface Country {
  capital: string
  code: string
  continent: string
  currency: string
  languages: string
  name: string
  native: string
  phone: string
}

export interface Language {
  code: string
  name: string
  native: string
  rtl: boolean
}

export const SEARCH_KEYS = {
  CONTINENTS: 'continents',
  COUNTRIES: 'countries',
  LANGUAGES: 'languages'
}

export interface SearchResponse {
  [SEARCH_KEYS.CONTINENTS]: Continent[]
  [SEARCH_KEYS.COUNTRIES]: Country[]
  [SEARCH_KEYS.LANGUAGES]: Language[]
}
