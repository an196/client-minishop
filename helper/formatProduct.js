/*
    @name: name of product
*/ 
export const formatName = (name, digit) => {
    const MAX_CHARACTER = digit || 23;
    
    if(typeof  name === "string"){
        if(name.length  > MAX_CHARACTER ){
            return name.slice(0, MAX_CHARACTER - 1) + '...'
        }
        else return name;
    }
    
    return 'Undefined';
}



