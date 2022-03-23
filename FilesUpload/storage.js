export const storage =(type)=>{
    const source = window[`${type}Storage`];
    const isSupported = typeof Storage === 'function';
    return {
    isSupported,
    getValues(){
        return {...source};
    },
    set(key,value){
        try{
            source.setItem(key,JSON.stringify(value));
        }
        catch(e){
            if(e instanceof DOMException){
                console.warn(e);
            } 
        }  
    },
    get(key){
        return JSON.parse(source.getItem(key));
    },
    removeItem(key){
        source.removeItem(key);
    },
    empty(){
        source.clear();
    },
    onChange(key,fn){
        window.addEventListener('storage',(e)=>{
            if(key === e.key){
            fn(e);    
            } 
        })
    }    
    }
}