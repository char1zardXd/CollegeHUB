import {
    Brain,
    BriefcaseBusiness,
    Compass,
    LockKeyhole,
    ShieldCheck,
    UsersRound,
} from 'lucide-react';
import type { TestIcon, TestPreview } from '../data/tests';
import './TestCard.css';

const iconMap = {
    compass: Compass,
    briefcase: BriefcaseBusiness,
    shield: ShieldCheck,
    lock: LockKeyhole,
    users: UsersRound,
    brain: Brain,
} satisfies Record<TestIcon, typeof Compass>;

interface TestCardProps {
    test: TestPreview;
}

export default function TestCard({ test }: TestCardProps) {
    const Icon = iconMap[test.icon];

    return (
        <article className={`test-card test-card--${test.color}`}>
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
        </article>
    );
}
