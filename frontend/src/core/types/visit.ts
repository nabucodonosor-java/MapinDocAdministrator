import { Doctor } from "./doctor"

export type VisitResponse = {
    content: Visit[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Visit = {
    id: number;
    visitDate: string;
    doctor: Doctor;
    success: boolean;
    description: string;
}