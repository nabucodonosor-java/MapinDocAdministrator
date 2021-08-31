import { Doctor } from "./doctor"

export type SpecializationResponse = {
    content: Specialization[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Specialization = {
    id: number;
    name: string;
    doctors?: Doctor[];
}