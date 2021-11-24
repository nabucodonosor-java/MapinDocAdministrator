import { Role } from "./role";

export type UserResponse = {
    content: User[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: Role[];
}