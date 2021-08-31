import { PlaceService } from "./placeService"

export type OfficeHoursResponse = {
    content: OfficeHours[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type OfficeHours = {
    id: number;
    seg: boolean;
    ter: boolean;
    qua: boolean;
    qui: boolean;
    sex: boolean;
    description: string;
    placeService: PlaceService;
}