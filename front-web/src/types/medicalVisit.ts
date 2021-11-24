import { HealthProfessional } from "./healthProfessional";

export type MedicalVisitResponse = {
    content: MedicalVisit[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type MedicalVisit = {
    id: number;
    visitDate: string;
    success: boolean;
    description: string;
    healthPro: HealthProfessional;
}