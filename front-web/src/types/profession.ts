import { HealthProfessional } from "./healthProfessional";
import { SocialAssistence } from "./socialAssistence";

export type ProfessionResponse = {
    content: Profession[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Profession = {
    id: number;
    name: string;
    healthPro: HealthProfessional[];
    socialPro: SocialAssistence[];
}