export type PeriodResponse = {
    content: Period[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Period = {
    period: 'MANHÃ' | 'TARDE'| 'MANHÃ/TARDE';
}