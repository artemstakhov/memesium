import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import Navbar from './components/NavBar';
import TableView from './containers/TableView';
import ListView from './containers/ListView';
import './App.css';
import './styles/main.scss';

function App() {
    return (
        <Router>
            <div className="App">
                <HeroUIProvider>
                    <Navbar />
                    <div className="container mx-auto p-4">
                        <Routes>
                            <Route path="/" element={<TableView />} />
                            <Route path="/list" element={<ListView />} />
                        </Routes>
                    </div>
                </HeroUIProvider>
            </div>
        </Router>
    );
}

export default App;