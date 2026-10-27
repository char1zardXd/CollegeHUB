import { useCallback, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import TestCard from '../../components/TestCard/TestCard';
import TestDetailsModal from '../../components/TestDetailsModal/TestDetailsModal';
import CreateTestModal from "../../components/CreateTestModal/CreateTestModal";
import { tests, type TestPreview } from '../../data/tests';
import './TestPage.css';

export default function TestPage() {
    const [selectedTest, setSelectedTest] = useState<TestPreview | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const closeTestModal = useCallback(() => setSelectedTest(null), []);
    const closeCreateModal = useCallback(() => setShowCreateModal(false), []);

    return (
        <section className="tests-page" aria-label="Тести та квізи">
            <div className="tests-toolbar">
                <button type="button" className="tests-create-button" onClick={() => setShowCreateModal(true)}>
                    <PlusCircle size={23} strokeWidth={2.2} /> Створити тест
                </button>
            </div>
            <div className="tests-grid">
                {tests.map((test) => (
                    <TestCard key={test.id} test={test} onClick={setSelectedTest} />
                ))}
            </div>
            {selectedTest && <TestDetailsModal test={selectedTest} onClose={closeTestModal} />}
            {showCreateModal && <CreateTestModal onClose={closeCreateModal} />}
        </section>
    );
}
