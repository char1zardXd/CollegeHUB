import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen,
    Calendar,
    List,
    Newspaper,
    Settings,
    ShieldMinus,
    Users
} from 'lucide-react';

import { useAuth } from '../../auth/AuthContext';
import { whatsNewRoute } from '../../navigation';
import CreateNewsModal from '../CreateNewsModal/CreateNewsModal';
import './AdminPanel.css';

const allowedRoles = ['STUDENT'];

const adminActions = [
    { id: 'news', title: 'Новина', icon: Newspaper },
    { id: 'reports', title: 'Звіти', icon: Users },
    { id: 'courses', title: 'Курси', icon: BookOpen },
    { id: 'schedule', title: 'Розклад', icon: Calendar },
    { id: 'activity', title: 'Звіти', icon: List },
    { id: 'system', title: 'Система', icon: Settings }
];

export default function AdminPanel() {
    const { user } = useAuth();
    const [isNewsModalOpen, setNewsModalOpen] = useState(false);
    const navigate = useNavigate();
    const closeNewsModal = useCallback(() => setNewsModalOpen(false), []);
    const handleNewsCreated = useCallback(() => navigate(whatsNewRoute), [navigate]);

    if (!user || !allowedRoles.includes(user.role)) return null;

    return (
        <section className="admin-panel" aria-labelledby="admin-panel-title">
            <h2 className="admin-panel-title" id="admin-panel-title">
                <ShieldMinus size={18} aria-hidden="true" />
                Адмін-панель
            </h2>

            <div className="admin-panel-grid">
                {adminActions.map(({ id, title, icon: Icon }) => (
                    <button
                        key={id}
                        type="button"
                        className={`admin-panel-button${id === 'news' ? ' primary' : ''}`}
                        onClick={id === 'news' ? () => setNewsModalOpen(true) : undefined}
                    >
                        <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                        <span>{title}</span>
                    </button>
                ))}
            </div>

            {isNewsModalOpen && <CreateNewsModal onClose={closeNewsModal} onCreated={handleNewsCreated} />}
        </section>
    );
}
