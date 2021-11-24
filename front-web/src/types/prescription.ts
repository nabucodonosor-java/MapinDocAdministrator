import { HealthProfessional } from "./healthProfessional"
import { Product } from "./product"

export type PrescriptionResponse = {
    content: Prescription[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Prescription = {
    id: number;
    prescriptionDate: string;
    healthPro: HealthProfessional;
    product: Product;
    qtde: number; 
}

export type PrescriptionTotal = {
    healthPro: string;
    totalServicos: number;
}