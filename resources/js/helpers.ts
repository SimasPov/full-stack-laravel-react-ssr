import { User } from '@/types';

export function can(user: User, permission: string): boolean {
    return user.permissions.includes(permission);
}
