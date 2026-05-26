import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import AboutPage from './components/AboutPage'
import SearchResults from './components/SearchResults'
import NotFound from './components/NotFound'

// Add socket support
// Add in transmoged item to tool-tip
// Call Character stat summary api endpoint
// Render stats

// Link all items to their wowhead page
// Wrap each item image in a <a> tag
// Probably using their ids 
// Set that in the src

// Add protected routes for
// Character Route
// Character Not Found Route?
// Dunno if we can do that for the not found
// Maybe make some state in search form 
// Then make that a protected route?
// Make sure to add state to context?
// Will need more research

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/:charName/:realmSlug' element={<SearchResults />} />
        <Route path='/notFound' element={<NotFound />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
