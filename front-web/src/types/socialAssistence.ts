import { PlaceService } from "./placeService";
import { Profession } from "./profession";

export type SocialAssistenceResponse = { 
    content: SocialAssistence[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type SocialAssistence = {
    id: number;
    name: string;
    cellPhone: string;
    email: string;
    description: string;
    profession: Profession;
    placeService: PlaceService;
}