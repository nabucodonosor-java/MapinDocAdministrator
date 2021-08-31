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
    cep: string;
    street: string;
    complement: string;
    district: string;
    city: string;
    state: string;
}