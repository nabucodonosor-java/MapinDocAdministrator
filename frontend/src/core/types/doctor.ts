import { PlaceService } from "./placeService";
import { Specialization } from "./specialization";
import { Specialty } from "./specialty";

export type DoctorResponse = {
    content: Doctor[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Doctor = {
    id: number;
    imgUrl: string;
    crm: string;
    name: string;
    cardName: string;
    phone: string;
    email: string;
    birthDate: string;
    resume: string;
    seg: boolean;
    ter: boolean;
    qua: boolean;
    qui: boolean;
    sex: boolean;
    officeHours: string;
    specialty: Specialty;
    specializations: Specialization[];
    placeService: PlaceService;
}