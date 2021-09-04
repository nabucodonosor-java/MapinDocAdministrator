import { Doctor } from "./doctor"

export type SpecialtyResponse = {
    content: Specialty[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Specialty = {
    id: number;
    name: string;
    doctors?: Doctor[];
}