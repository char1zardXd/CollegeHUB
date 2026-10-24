import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { icons } from '../icons';
import './Modal.css';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  /** Ширина вікна в px (за замовчуванням 480) */
  width?: number;
}

export default function Modal({ onClose, children, width = 480 }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal"
        style={{ maxWidth: width }}
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Закрити">
          <img src={icons.close} alt="" width={14} height={14} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
