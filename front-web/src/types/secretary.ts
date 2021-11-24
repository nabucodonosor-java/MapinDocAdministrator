import { PlaceService } from "./placeService";

export type SecretaryResponse = {
    content: Secretary[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Secretary = {
    id: number;
    name: string;
    birthDate: string;
    description: string;
    placeService: PlaceService;
}