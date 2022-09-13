import { format } from "date-fns";

export const localeTime = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
}