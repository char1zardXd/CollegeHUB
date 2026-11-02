import type { TestPreview } from '../../data/tests';
import { testIcons } from './testIcons';
import './TestCard.css';

interface TestCardProps {
    test: TestPreview;
    onClick?: (test: TestPreview) => void;
}

export default function TestCard({ test, onClick }: TestCardProps) {
    const Icon = testIcons[test.icon];

    return (
        <article className={`test-card test-card--${test.color}`}>
            <button
                type="button"
                className="test-card__trigger"
                onClick={() => onClick?.(test)}
                aria-label={`Переглянути тест: ${test.title}`}
            >
                <div className="test-card__header">
                    <span className="test-card__category">{test.category}</span>
                    <span className="test-card__icon" aria-hidden="true">
            <Icon size={26} strokeWidth={1.8} />
          </span>
                </div>
                <div className="test-card__body">
                    <h2 className="test-card__title">{test.title}</h2>
                    <p className="test-card__description">{test.description}</p>
                </div>
            </button>
        </article>
    );
}

