import { Check, Rocket, Star } from 'lucide-react';

import { news } from '../../data/news';
import './UpdatesPage.css';

function formatDate(isoDate: string): string {
    const [year, month, day] = isoDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    if (date.toDateString() === new Date().toDateString()) {
        return 'Сьогодні';
    }

    return date.toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

export default function UpdatesPage() {
    return (
        <div className="updates-page">
            <div className="updates-container">
                <header className="updates-header">
                    <h1>Історія оновлень</h1>
                    <p>
                        Дізнайтеся про останні покращення, нові функції та виправлення
                        помилок на платформі CollegeHub.
                    </p>
                </header>

                {news.map(item => (
                    <article className="update-card" key={item.id}>
                        <header className="update-card-header">
                            <span className="update-card-icon" aria-hidden="true">
                                <Rocket size={20} />
                            </span>
                            <div className="update-card-heading">
                                <h2>{item.title}</h2>
                                <span className="update-card-version">{item.version}</span>
                            </div>
                            <time className="update-card-date" dateTime={item.date}>
                                {formatDate(item.date)}
                            </time>
                        </header>

                        <p className="update-card-lead">{item.lead}</p>
                        <p className="update-card-text">{item.text}</p>

                        <h3 className="update-card-subtitle">
                            <Star size={13} aria-hidden="true" />
                            Головні нововведення:
                        </h3>

                        <ul className="update-card-list">
                            {item.highlights.map(highlight => (
                                <li key={highlight.title}>
                                    <Check size={15} aria-hidden="true" />
                                    <div>
                                        <strong>{highlight.title}</strong>
                                        <p>{highlight.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </div>
    );
}
