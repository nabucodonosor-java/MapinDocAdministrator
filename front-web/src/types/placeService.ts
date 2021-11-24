import { HealthProfessional } from "./healthProfessional";
import { Secretary } from "./secretary";
import { SocialAssistence } from "./socialAssistence";

export type PlaceServiceResponse = {
    content: PlaceService[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type PlaceService = {
    id: number;
    name: string;
    phone: string;
    cellPhone: string;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    clinic: boolean;
    hospital: boolean;
    medicalCenter: boolean;
    cir: boolean;
    cityHall: boolean;
    apae: boolean;
    description: string;
    secretaries: Secretary[];
    healthPro: HealthProfessional[];
    socialPro: SocialAssistence[];
}