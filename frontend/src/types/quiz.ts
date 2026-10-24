export type QuizColor = 'green' | 'purple' | 'pink' | 'blue' | 'orange' | 'yellow';

export type QuizIconName = 'compass' | 'briefcase' | 'shield' | 'lock' | 'users' | 'brain';

export interface Quiz {
  id: number;
  title: string;
  category: string;
  description: string;
  questionsCount: number;
  durationMinutes: number;
  participants: string;
  color: QuizColor;
  icon: QuizIconName;
}

export interface NewQuestion {
  id: number;
  text: string;
  answers: string[];
  correctIndex: number;
}

export interface NewQuizPayload {
  title: string;
  category: string;
  durationMinutes: number;
  color: QuizColor;
  description: string;
  questions: NewQuestion[];
}
