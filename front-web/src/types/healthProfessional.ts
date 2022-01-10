import { PlaceService } from "./placeService";
import { Profession } from "./profession";
import { Specialization } from "./specialization";

export type HealthProfessionalResponse = {
    content: HealthProfessional[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type HealthProfessional = {
    id: number;
    imgUrl: string;
    register: string;
    name: string;
    cardName: string;
    phone: string;
    email: string;
    birthDate: string;
    resume: string;
    byScheduling: boolean;
    seg: boolean;
    segPeriod: string;
    ter: boolean;
    terPeriod: string;
    qua: boolean;
    quaPeriod: string;
    qui: boolean;
    quiPeriod: string;
    sex: boolean;
    sexPeriod: string;
    sab: boolean;
    sabPeriod: string;
    officeHours: string;
    partner: boolean;
    strategic: boolean;
    potencial: boolean;
    schedulingDate: string;
    profession: Profession;
    placeService: PlaceService;
    specializations: Specialization[];
}