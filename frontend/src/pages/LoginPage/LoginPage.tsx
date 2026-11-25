
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    BookOpen,
    ChevronDown,
    Eye,
    EyeOff,
    GraduationCap,
    LockKeyhole,
    Mail,
    Send,
    Sparkles,
    UserRound
} from 'lucide-react';

import { useAuth } from '../../auth/AuthContext';

import './LoginPage.css';

type AuthMode = 'login' | 'register';

interface LoginPageProps {
    mode?: AuthMode;
}

export default function LoginPage({
                                      mode = 'login'
                                  }: LoginPageProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [group, setGroup] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const { user, login, register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isRegister = mode === 'register';

    if (user) {
        return <Navigate to="/tests" replace />;
    }

    const redirectTo =
        (location.state as { from?: string } | null)?.from ?? '/tests';

    function validate(): string | null {
        if (isRegister && fullName.trim().length === 0) {
            return "Вкажіть повне ім'я та прізвище";
        }
        if (isRegister && !group) {
            return 'Оберіть академічну групу';
        }
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
            return 'Введіть коректну електронну пошту';
        }
        if (password.length === 0) {
            return 'Введіть пароль';
        }
        if (isRegister && password.length < 8) {
            return 'Пароль має містити щонайменше 8 символів';
        }
        return null;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (submitting) return;

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setSubmitting(true);

        try {
            if (isRegister) {
                await register(
                    {
                        email: email.trim(),
                        password,
                        fullName: fullName.trim(),
                        group
                    },
                    remember
                );
            } else {
                await login(email.trim(), password, remember);
            }
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Сталася помилка. Спробуйте ще раз.'
            );
            setSubmitting(false);
        }
    }

    return (
        <div className="auth-page">
            <div className={`auth-card ${isRegister ? 'auth-card-register' : ''}`}>

                {/* LEFT PANEL */}

                <aside className="auth-aside">

                    <Link to="/welcome" className="auth-brand">
                        <span className="auth-brand-icon">
                            <GraduationCap size={22} />
                        </span>
                        <span>CollegeHub</span>
                    </Link>

                    <div className="auth-aside-main">

                        <div className="auth-portal-badge">
                            <Sparkles size={13} />
                            Навчальний портал №1
                        </div>

                        <h1 className="auth-aside-title">
                            Ваш простір для
                            <br />
                            знань та
                            <br />
                            зростання
                        </h1>

                        <p className="auth-aside-description">
                            Складайте тести, переглядайте розклад
                            та стежте за своєю успішністю в
                            сучасному університетському кабінеті.
                        </p>

                        <div className="auth-testimonial">
                            <div className="auth-testimonial-avatar">
                                <UserRound size={24} />
                            </div>

                            <div className="auth-testimonial-text">
                                <p>
                                    «Зручніше ніж будь-коли складати
                                    тести та бачити свої оцінки!»
                                </p>
                                <span>
                                    — Анастасія В., 3 курс КН
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="auth-stats">
                        <div>
                            <strong>10k+</strong>
                            <span>АКТИВНИХ СТУДЕНТІВ</span>
                        </div>

                        <div>
                            <strong>98%</strong>
                            <span>УСПІШНІСТЬ</span>
                        </div>

                        <div>
                            <strong>24/7</strong>
                            <span>ДОСТУП</span>
                        </div>
                    </div>

                </aside>

                {/* RIGHT PANEL */}

                <main className="auth-form-panel">
                    <div className="auth-form-content">

                        <div className="auth-tabs">
                            <Link
                                to="/login"
                                className={`auth-tab ${!isRegister ? 'active' : ''}`}
                            >
                                Вхід
                            </Link>

                            <Link
                                to="/register"
                                className={`auth-tab ${isRegister ? 'active' : ''}`}
                            >
                                Реєстрація
                            </Link>
                        </div>

                        <div className="auth-heading">
                            <h2>
                                {isRegister
                                    ? 'Створіть свій акаунт 🚀'
                                    : 'Вітаємо в CollegeHub 👋'
                                }
                            </h2>

                            <p>
                                {isRegister
                                    ? 'Заповніть форму для реєстрації студентського профілю'
                                    : 'Введіть свої дані для входу до особистого кабінету'
                                }
                            </p>
                        </div>

                        <div className="auth-socials">
                            <button
                                type="button"
                                disabled
                                title="Підключення Google буде додано пізніше"
                            >
                                <span className="auth-google-icon">G</span>
                                Google
                            </button>

                            <button
                                type="button"
                                disabled
                                title="Підключення Telegram буде додано пізніше"
                            >
                                <Send size={17} color="#36a8e0" />
                                Telegram
                            </button>
                        </div>

                        <div className="auth-divider">
                            <span>АБО ЧЕРЕЗ ПОШТУ</span>
                        </div>

                        <form
                            className="auth-form"
                            onSubmit={handleSubmit}
                            noValidate
                        >

                            {isRegister && (
                                <>
                                    <label htmlFor="auth-fullname">
                                        Повне ім'я та прізвище
                                    </label>

                                    <div className="auth-input">
                                        <UserRound size={17} />
                                        <input
                                            id="auth-fullname"
                                            type="text"
                                            placeholder="Анастасія Василенко"
                                            autoComplete="name"
                                            value={fullName}
                                            onChange={e => setFullName(e.target.value)}
                                        />
                                    </div>

                                    <label
                                        htmlFor="auth-group"
                                        className="auth-field-spacing"
                                    >
                                        Академічна група
                                    </label>

                                    <div className="auth-input auth-select">
                                        <BookOpen size={17} />

                                        <select
                                            id="auth-group"
                                            value={group}
                                            onChange={e => setGroup(e.target.value)}
                                        >
                                            <option value="" disabled>
                                                Оберіть академічну групу
                                            </option>
                                            <option value="КН-31">
                                                КН-31
                                            </option>
                                            <option value="КН-32">
                                                КН-32
                                            </option>
                                            <option value="КН-302">
                                                КН-302 (Комп'ютерні науки)
                                            </option>
                                        </select>

                                        <ChevronDown
                                            size={16}
                                            className="auth-select-arrow"
                                        />
                                    </div>
                                </>
                            )}

                            <label
                                htmlFor="auth-email"
                                className={isRegister ? 'auth-field-spacing' : ''}
                            >
                                Електронна пошта
                            </label>

                            <div className="auth-input">
                                <Mail size={17} />
                                <input
                                    id="auth-email"
                                    type="email"
                                    placeholder="student@college.edu.ua"
                                    autoComplete="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="auth-password-label">
                                <label htmlFor="auth-password">
                                    Пароль
                                </label>

                                {!isRegister && (
                                    <span className="auth-forgot">
                                        Забули пароль?
                                    </span>
                                )}
                            </div>

                            <div className="auth-input">
                                <LockKeyhole size={17} />

                                <input
                                    id="auth-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    autoComplete={
                                        isRegister
                                            ? 'new-password'
                                            : 'current-password'
                                    }
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />

                                <button
                                    className="auth-password-eye"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={
                                        showPassword
                                            ? 'Приховати пароль'
                                            : 'Показати пароль'
                                    }
                                >
                                    {showPassword
                                        ? <EyeOff size={17} />
                                        : <Eye size={17} />
                                    }
                                </button>
                            </div>

                            <label className="auth-remember">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={e => setRemember(e.target.checked)}
                                />
                                <span>
                                    Запам'ятати мене на цьому пристрої
                                </span>
                            </label>

                            {error && (
                                <p className="auth-error" role="alert">
                                    {error}
                                </p>
                            )}

                            <button
                                className="auth-submit"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting
                                    ? 'Зачекайте...'
                                    : isRegister
                                        ? 'Зареєструватися'
                                        : 'Увійти в CollegeHub'
                                }
                                <ArrowRight size={17} />
                            </button>

                        </form>
                    </div>
                </main>

            </div>
        </div>
    );
}
