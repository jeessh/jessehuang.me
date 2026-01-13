import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SimpleView from './pages/simple-view'
import StoryView from './pages/story-view'
function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<SimpleView/>} />
        <Route path="/story" element={<StoryView/>} />
      </Routes>
     </Router>
    </>
  )
}

export default App
