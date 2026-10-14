//framework import
import  {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css"

//pages import
import HomePage from "./pages/HomePage";
import SubjectsPage from "./pages/SubjectsPage";
import FlashCardPage from "./pages/FlashCardPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import UserProfilePage from "./pages/UserProfilePage";

//components import
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <div className="app-body">
                <Sidebar />

                <main className="content-area">
                    <Routes>
                        <Route path="/HomePage" element={<HomePage />} />
                        <Route path="/subjects" element={<SubjectsPage />} />
                        <Route path="/flashcards" element={<FlashCardPage />} />
                        <Route path="/leaderboard" element={<LeaderboardPage />} />
                        <Route path="/UserProfilePage" element={<UserProfilePage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;