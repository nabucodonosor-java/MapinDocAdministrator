export type RoleResponse = {
    content: Role[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Role = {
    id: number;
    authority: string;
}