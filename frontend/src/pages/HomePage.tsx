import "./HomePage.css"

export default function HomePage(){
    return (
        <div className="home-container">


            <section className="welcome-banner">
                <h1>Ласкаво просимо!</h1>
                <button className="btn-primary">Почати навчання</button>
            </section>

            <div className="home-content-grid">
                <div className="card success-dynamics-card">
                    <h2>Динаміка успішності групи</h2>

                    <div className="chart-placeholder">
                        <div className="chart-label">Group Average</div>
                        <div className="fake-chart-line"></div>

                        <div className="chart-label" style={{ marginTop: "1rem" }}>Individual Score</div>
                        <div className="fake-chart-line"></div>
                    </div>

                    <button className="btn-secondary">Детальніше</button>
                </div>


                <div className="home-right-column">

                    <div className="card quizzes-card">
                        <h3>Активні квизи та завдання</h3>

                        <div className="quiz-item">
                            <div className="quiz-info">
                                <span className="quiz-title">Мережеві протоколи</span>
                                <span className="quiz-date">21/11/2022</span>
                            </div>
                            <button className="btn-small">Почати тест</button>
                        </div>

                        <div className="quiz-item">
                            <div className="quiz-info">
                                <span className="quiz-title">Класи та об'єкти</span>
                                <span className="quiz-date">19/10/2022</span>
                            </div>
                            <button className="btn-small">Почати тест</button>
                        </div>

                        <div className="quiz-item">
                            <div className="quiz-info">
                                <span className="quiz-title">Класи та об'єкти</span>
                                <span className="quiz-date">04/10/2022</span>
                            </div>
                            <button className="btn-small">Почати тест</button>
                        </div>
                    </div>
                    <div className="card flashcards-mini-card">
                        <h3>Флеш-картки</h3>
                        <div className="flashcard-box">
                            <span>Термін: Інкапсуляція</span>
                            <button className="btn-small">Flip</button>
                        </div>
                        <div className="flashcard-actions">
                            <button className="btn-outline">Знаю</button>
                            <button className="btn-outline">Повторити</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}