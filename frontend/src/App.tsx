import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import StudentsPage from "./pages/StudentsPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import QuizzesPage from "./pages/QuizzesPage/QuizzesPage";

import "./App.css";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="assignments" element={<AssignmentsPage />} />
            <Route path="quizzes" element={<QuizzesPage />} />

            {/* Тимчасові заглушки, поки немає справжніх сторінок */}
            <Route path="my-learning" element={<p>Моє навчання</p>} />
            <Route path="courses" element={<p>Доступні курси</p>} />
            <Route path="calendar" element={<p>Календар</p>} />
            <Route path="analytics" element={<p>Аналітика та прогрес</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}