import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    ArrowUpRight,
    Check,
    Sparkles
} from 'lucide-react';

import './LandingPage.css';
const photos = [
    '/landing/photo1.jpg',
    '/landing/photo2.jpg',
    '/landing/photo3.jpg',
    '/landing/photo4.jpg',
    '/landing/photo5.jpg',
    '/landing/photo6.jpg',
    '/landing/photo7.jpg'
];
export default function LandingPage() {
    const [randomPhoto] = useState(
        () => photos[Math.floor(Math.random() * photos.length)]
    );
    return (
        <div className="landing-page">

            <header className="landing-header">
                <div className="landing-header-inner">

                    <div className="landing-logo">
                        <span className="landing-logo-icon">
                            <BookOpen size={22} strokeWidth={1.9} />
                        </span>
                        <span>CollegeHub</span>
                    </div>

                    <nav className="landing-nav">
                        <span>Інструменти</span>
                        <span>Курси</span>
                        <span>Як це працює</span>
                        <span>Відгуки</span>
                    </nav>

                    <div className="landing-header-actions">
                        <Link to="/login" className="landing-login-btn">
                            Увійти
                        </Link>

                        <Link to="/register" className="landing-primary-btn">
                            Почати навчання
                        </Link>
                    </div>

                </div>
            </header>

            <main className="landing-hero">

                <div className="landing-hero-content">

                    <div className="landing-eyebrow">
                        <span className="landing-dot" />
                        ТВОЄ МІСЦЕ ДЛЯ НОВИХ ЗНАНЬ
                    </div>

                    <h1 className="landing-title">
                        Вчись цікаво.
                        <br />
                        Розумій глибше.
                        <br />
                        <span>Досягай свого.</span>
                    </h1>

                    <p className="landing-description">
                        Квізи, флешкартки, курси та тести — усе,
                        щоб перетворити «не розумію» на «я це знаю».
                    </p>

                    <div className="landing-hero-buttons">

                        <Link to="/register" className="landing-explore-btn">
                            Знайти свій курс
                        </Link>

                        <button
                            type="button"
                            className="landing-quiz-btn"
                        >
                            Спробувати квіз
                            <ArrowUpRight size={19} />
                        </button>

                    </div>

                    <div className="landing-benefits">
                        <span>
                            <Check size={17} />
                            Безкоштовний старт
                        </span>

                        <span>
                            <Check size={17} />
                            У власному темпі
                        </span>
                    </div>

                </div>

                <div className="landing-hero-visual">
                    <div className="landing-image-wrapper">

                        <img
                            className="landing-hero-image"
                            src={randomPhoto}
                            alt="Студенти розробники"
                            loading="eager"
                        />

                        <div className="landing-image-badge">
                            <Sparkles size={18} />
                            <span>
                                Маленькі кроки. Великі відкриття.
                            </span>
                        </div>

                    </div>
                </div>

            </main>

        </div>
    );
}
