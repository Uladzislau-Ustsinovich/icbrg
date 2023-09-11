import {AuthProvider} from './context/AuthContext'
import {BaseRoutes} from './routes/BaseRoutes'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BaseRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
