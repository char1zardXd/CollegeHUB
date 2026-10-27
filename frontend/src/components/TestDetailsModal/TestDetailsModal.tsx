import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Clock3, FileQuestion, PlayCircle, UsersRound, X } from 'lucide-react';
import type { TestPreview } from '../../data/tests';
import { getTestDetails } from '../../data/testDetails';
import { testIcons } from '../TestCard/testIcons';
import './TestDetailsModal.css';

interface TestDetailsModalProps {
    test: TestPreview;
    onClose: () => void;
}

export default function TestDetailsModal({ test, onClose }: TestDetailsModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const Icon = testIcons[test.icon];
    const details = getTestDetails(test.id);

    useEffect(() => {
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        closeButtonRef.current?.focus();
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
            if (event.key !== 'Tab' || !dialogRef.current) return;
            const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
                'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ));
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first.focus();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => { document.removeEventListener('keydown', handleKeyDown); previous?.focus(); };
    }, [onClose]);

    return createPortal(
        <div className="test-modal-overlay" onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div
                ref={dialogRef}
                className="test-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="test-modal-title"
                aria-describedby="test-modal-description"
            >
                <div className="test-modal__top">
          <span className={`test-modal__icon test-modal__icon--${test.color}`} aria-hidden="true">
            <Icon size={24} strokeWidth={1.8} />
          </span>
                    <button ref={closeButtonRef} type="button" className="test-modal__close" onClick={onClose} aria-label="Закрити вікно">
                        <X size={19} strokeWidth={1.8} />
                    </button>
                </div>

                <div className="test-modal__category">{test.category}</div>
                <h2 id="test-modal-title" className="test-modal__title">{test.title}</h2>

                {details && (
                    <div className="test-modal__stats" aria-label="Інформація про тест">
                        <span><FileQuestion size={15} /> {details.questions} питань</span>
                        <span><Clock3 size={15} /> ~{details.minutes} хв</span>
                        <span><UsersRound size={15} /> {details.participants} учасників</span>
                    </div>
                )}
                <div className="test-modal__divider" />
                <p id="test-modal-description" className="test-modal__description">{test.description}</p>
                <button type="button" className="test-modal__join">
                    <PlayCircle size={18} strokeWidth={1.8} /> Приєднатися
                </button>
            </div>
        </div>,
        document.body
    );
}
