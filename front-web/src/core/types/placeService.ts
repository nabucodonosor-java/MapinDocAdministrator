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
}