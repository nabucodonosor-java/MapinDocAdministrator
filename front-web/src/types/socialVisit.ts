import { SocialAssistence } from "./socialAssistence";

export type SocialVisitResponse = {
    content: SocialVisit[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type SocialVisit = {
    id: number;
    socialVisitDate: string;
    socialSuccess: boolean;
    socialDescription: string;
    socialPro: SocialAssistence;
}