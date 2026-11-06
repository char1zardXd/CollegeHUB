
import type { TestPreview, TestColor } from '../data/tests';

export interface TestOption {
    id: number;
    text: string;
}

export interface TestQuestion {
    id: number;
    text: string;
    options: TestOption[];
}

export interface PlayTest {
    id: number;
    title: string;
    description: string;
    tag?: string | null;
    questions: TestQuestion[];
}

export interface SubmitTestResult {
    correctAnswers: number;
    totalQuestions: number;
    percentage: number;
}

interface TestListItem {
    id: number;
    title: string;
    description: string;
    tag: string | null;
    author?: string;
    totalQuestions?: number;
}

const cardColors: TestColor[] = [
    'mint',
    'purple',
    'pink',
    'blue',
    'peach',
    'yellow'
];

export async function getTests(
    signal?: AbortSignal
): Promise<TestPreview[]> {

    const response = await fetch('/api/tests', { signal });

    if (!response.ok) {
        throw new Error(
            `Не вдалося завантажити тести (${response.status})`
        );
    }

    const data: TestListItem[] = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('Некоректний формат списку тестів');
    }

    return data.map((test, index) => ({
        id: test.id,
        title: test.title,
        description: test.description,
        category: test.tag || 'Тестування',
        icon: 'brain',
        color: cardColors[index % cardColors.length]
    }));
}

export async function getTestForPlay(
    id: string,
    signal?: AbortSignal
): Promise<PlayTest> {

    const response = await fetch(
        `/api/tests/${id}/take`,
        { signal }
    );

    if (!response.ok) {
        throw new Error(
            response.status === 404
                ? 'Тест не знайдено'
                : `Не вдалося завантажити тест (${response.status})`
        );
    }

    const test: PlayTest = await response.json();

    return {
        ...test,
        tag: test.tag ?? null
    };
}

export async function submitTest(
    id: string,
    answers: Record<number, number>,
    totalQuestions: number
): Promise<SubmitTestResult> {

    const studentId = Number(
        import.meta.env.VITE_TEST_STUDENT_ID
    );

    if (!Number.isSafeInteger(studentId) || studentId <= 0) {
        throw new Error(
            'Не налаштовано тестовий ID студента'
        );
    }

    const response = await fetch(
        `/api/tests/${id}/submit?studentId=${studentId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                answers: Object.entries(answers).map(
                    ([questionId, optionId]) => ({
                        questionId: Number(questionId),
                        selectedOptionId: optionId
                    })
                )
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Не вдалося надіслати відповіді (${response.status})`
        );
    }

    const correctAnswers: unknown = await response.json();

    if (
        typeof correctAnswers !== 'number' ||
        !Number.isInteger(correctAnswers) ||
        correctAnswers < 0 ||
        correctAnswers > totalQuestions
    ) {
        throw new Error('Некоректна відповідь сервера');
    }

    const percentage = totalQuestions > 0
        ? Math.round(
        (correctAnswers / totalQuestions) * 10000
    ) / 100
        : 0;

    return {
        correctAnswers,
        totalQuestions,
        percentage
    };
}
