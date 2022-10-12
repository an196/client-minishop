import { format } from "date-fns";

/*
    @date: type of date: ICT or GMT 
*/ 

export const localeTime = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
}