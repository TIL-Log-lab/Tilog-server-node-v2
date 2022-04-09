import * as dateFns from 'date-fns';

export const now = (date?: Date) => (date ? new Date(date) : new Date());
export const dateToISO = (date: Date) => dateFns.formatISO(date);
