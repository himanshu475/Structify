import React, {createContext, useState, useContext} from "react";

const SearchContext=createContext();

export const useSearch=()=>{
    const context=useContext(SearchContext);

    if(!context){
        throw new Error('useSearch must be used within s SearchProvide');
    }
    return context;
}

export const SearchProvider=({children})=>{
    const [searchTerm, setSearchTerm]=useState('');

    return (
        <SearchContext.Provider value={{searchTerm, setSearchTerm}}>
            {children}
        </SearchContext.Provider>
    );
}