import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Check, Info, Pin, Star } from 'lucide-react';

import { NEWS_CHANGED_EVENT, getNews } from '../../api/newsApi';
import type { NewsPost } from '../../api/newsApi';
import { defaultAccentColor, getNewsIcon } from '../../data/newsOptions';
import './UpdatesPage.css';

function formatDate(isoDateTime: string): string {
    const date = new Date(isoDateTime);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    if (date.toDateString() === new Date().toDateString()) {
        return 'Сьогодні';
    }

    return date.toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function accentStyle(color: string | null): CSSProperties {
    return { '--accent': color || defaultAccentColor } as CSSProperties;
}

export default function UpdatesPage() {
    const [posts, setPosts] = useState<NewsPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        getNews(controller.signal)
            .then(data => {
                setPosts(data);
                setError(null);
                setLoading(false);
            })
            .catch(err => {
                if (controller.signal.aborted) return;
                setError(err instanceof Error ? err.message : 'Не вдалося завантажити новини');
                setLoading(false);
            });

        return () => controller.abort();
    }, [reloadKey]);

    // нова новина опублікована, поки відкрита ця сторінка
    useEffect(() => {
        const reload = () => setReloadKey(key => key + 1);
        window.addEventListener(NEWS_CHANGED_EVENT, reload);
        return () => window.removeEventListener(NEWS_CHANGED_EVENT, reload);
    }, []);

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

                {loading && posts.length === 0 && (
                    <p className="updates-status">Завантаження...</p>
                )}

                {error && (
                    <p className="updates-status updates-status--error" role="alert">{error}</p>
                )}

                {!loading && !error && posts.length === 0 && (
                    <p className="updates-status">Поки що немає жодної новини</p>
                )}

                {posts.map(post => {
                    const Icon = getNewsIcon(post.icon);

                    return (
                        <article
                            className="update-card"
                            key={post.id}
                            style={accentStyle(post.accentColor)}
                        >
                            <header className="update-card-header">
                                <span className="update-card-icon" aria-hidden="true">
                                    <Icon size={20} />
                                </span>
                                <div className="update-card-heading">
                                    <h2>{post.title}</h2>
                                    {post.pinned && (
                                        <span className="update-card-pinned">
                                            <Pin size={10} aria-hidden="true" />
                                            Закріплено
                                        </span>
                                    )}
                                    <span className="update-card-version">{post.version}</span>
                                </div>
                                <time className="update-card-date" dateTime={post.createdAt}>
                                    {formatDate(post.createdAt)}
                                </time>
                            </header>

                            <p className="update-card-lead">{post.introText}</p>

                            {post.changes.length > 0 && (
                                <>
                                    <h3 className="update-card-subtitle">
                                        <Star size={13} aria-hidden="true" />
                                        Головні нововведення:
                                    </h3>

                                    <ul className="update-card-list">
                                        {post.changes.map((change, index) => (
                                            <li key={index}>
                                                <Check size={15} aria-hidden="true" />
                                                <div>
                                                    {change.title && <strong>{change.title}</strong>}
                                                    {change.description && <p>{change.description}</p>}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {post.highlightedNote && (
                                <div className="update-card-note">
                                    <Info size={16} aria-hidden="true" />
                                    <p>{post.highlightedNote}</p>
                                </div>
                            )}

                            <p className="update-card-author">Автор: {post.authorName}</p>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
