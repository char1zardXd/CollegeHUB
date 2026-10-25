import TestCard from "../../components/TestCard/TestCard";
import { tests } from "../../data/tests";
import "./TestPage.css";

export default function TestPage() {
    return (
        <section className="tests-page" aria-label="Тести та квізи">
            <div className="tests-grid">
                {tests.map((test) => <TestCard key={test.id} test={test} />)}
            </div>
        </section>
    );
}
