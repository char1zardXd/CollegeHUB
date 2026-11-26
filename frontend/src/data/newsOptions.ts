import { GraduationCap, Megaphone, Rocket, Sparkles, Wrench } from 'lucide-react';

export const accentColors = [
    { id: 'release', label: 'Реліз', value: '#87456f' },
    { id: 'announce', label: 'Анонс', value: '#3b82f6' },
    { id: 'fix', label: 'Фікс', value: '#10b981' },
    { id: 'important', label: 'Важливо', value: '#f59e0b' }
] as const;

export const cardIcons = [
    { id: 'rocket', label: 'Ракета', icon: Rocket },
    { id: 'sparkles', label: 'Іскри', icon: Sparkles },
    { id: 'megaphone', label: 'Мегафон', icon: Megaphone },
    { id: 'wrench', label: 'Ключ', icon: Wrench },
    { id: 'education', label: 'Навчання', icon: GraduationCap }
] as const;

export type AccentId = (typeof accentColors)[number]['id'];
export type IconId = (typeof cardIcons)[number]['id'];

export const defaultAccentColor: string = accentColors[0].value;
export function getNewsIcon(id: string | null | undefined) {
    return (cardIcons.find(item => item.id === id) ?? cardIcons[0]).icon;
}
