import { format } from 'date-fns';

export const round = (value: number, precision: number) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export const formatDate = (date: string, pattern: string) => {
    const dt = new Date(date);
    const dtOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    return format(dtOnly, pattern);
}