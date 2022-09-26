export const formatName = (name) => {
    const MAX_CHARACTER = 23;
    
    if(typeof  name === "string"){
        if(name.length  > MAX_CHARACTER ){
            return name.slice(0,22) + '...'
        }
        else return name;
    }
    
    return 'Undefined';
}