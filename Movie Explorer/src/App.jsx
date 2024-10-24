import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // Add this import
import Home from './pages/Home';
import Header from './components/layout/Header';

function App() {
  return (
    <ThemeProvider> {/* Wrap everything in ThemeProvider */}
      <Router>
        <div className="app">
          <Header /> {/* Add Header here, outside of Routes */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;