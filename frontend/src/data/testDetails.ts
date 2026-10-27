interface TestDetails { questions: number; minutes: number; participants: string }
const demoDetails: Record<number, TestDetails> = {
    1: { questions: 45, minutes: 30, participants: '1,2 тис.' },
    2: { questions: 32, minutes: 25, participants: '860' },
    3: { questions: 20, minutes: 15, participants: '540' },
    4: { questions: 24, minutes: 20, participants: '730' },
    5: { questions: 18, minutes: 15, participants: '420' },
    6: { questions: 25, minutes: 20, participants: '960' },
};
export function getTestDetails(id: number): TestDetails | undefined { return demoDetails[id]; }
