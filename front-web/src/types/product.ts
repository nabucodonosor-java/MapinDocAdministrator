export type ProductResponse = {
    content: Product[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Product = {
    id: number;
    name: string;
    weight: number;
}