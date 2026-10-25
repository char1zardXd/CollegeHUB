import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import EmptyPage from './pages/EmptyPage/EmptyPage';
import TestPage from './pages/TestPage/TestPage';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className="app-shell">
                <Sidebar />
                <div className="workspace">
                    <Header />
                    <main className="main-content" id="main-content">
                        <Routes>
                            <Route path="/" element={<Navigate to="/tests" replace />} />
                            <Route path="/tests" element={<TestPage />} />
                            <Route path="/my-learning" element={<EmptyPage />} />
                            <Route path="/courses" element={<EmptyPage />} />
                            <Route path="/calendar" element={<EmptyPage />} />
                            <Route path="/analytics" element={<EmptyPage />} />
                            <Route path="/profile" element={<EmptyPage />} />
                            <Route path="*" element={<Navigate to="/tests" replace />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}
