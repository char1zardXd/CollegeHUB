
import { useCallback, useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';

import TestCard from '../../components/TestCard/TestCard';
import TestDetailsModal from '../../components/TestDetailsModal/TestDetailsModal';
import CreateTestModal from '../../components/CreateTestModal/CreateTestModal';

import { getTests } from '../../api/testApi';
import type { TestPreview } from '../../data/tests';

import './TestPage.css';

export default function TestPage() {
    const [tests, setTests] = useState<TestPreview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedTest, setSelectedTest] =
        useState<TestPreview | null>(null);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const closeTestModal = useCallback(
        () => setSelectedTest(null),
        []
    );

    const closeCreateModal = useCallback(
        () => setShowCreateModal(false),
        []
    );

    useEffect(() => {
        const controller = new AbortController();

        getTests(controller.signal)
            .then(data => {
                setTests(data);
            })
            .catch((err: unknown) => {
                if (controller.signal.aborted) return;

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Помилка завантаження тестів'
                );
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, []);

    return (
        <section
            className="tests-page"
            aria-label="Тести та квізи"
        >
            <div className="tests-toolbar">
                <button
                    type="button"
                    className="tests-create-button"
                    onClick={() => setShowCreateModal(true)}
                >
                    <PlusCircle size={23} strokeWidth={2.2} />
                    Створити тест
                </button>
            </div>

            {loading && (
                <p className="tests-status" role="status">
                    Завантаження тестів...
                </p>
            )}

            {error && (
                <p className="tests-status tests-status--error" role="alert">
                    {error}
                </p>
            )}

            {!loading && !error && tests.length === 0 && (
                <p className="tests-status">
                    Поки немає доступних тестів.
                </p>
            )}

            {!loading && !error && (
                <div className="tests-grid">
                    {tests.map(test => (
                        <TestCard
                            key={test.id}
                            test={test}
                            onClick={setSelectedTest}
                        />
                    ))}
                </div>
            )}

            {selectedTest && (
                <TestDetailsModal
                    test={selectedTest}
                    onClose={closeTestModal}
                />
            )}

            {showCreateModal && (
                <CreateTestModal
                    onClose={closeCreateModal}
                />
            )}
        </section>
    );
}
