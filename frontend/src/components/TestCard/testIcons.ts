import {
    Brain, BriefcaseBusiness, Compass, LockKeyhole, ShieldCheck, UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TestIcon } from '../../data/tests';

export const testIcons: Record<TestIcon, LucideIcon> = {
    compass: Compass,
    briefcase: BriefcaseBusiness,
    shield: ShieldCheck,
    lock: LockKeyhole,
    users: UsersRound,
    brain: Brain,
};
