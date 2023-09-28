import React, { createContext, useContext, useEffect, useState } from 'react'

const Crytpo = createContext();

const CryptoContext = ({children}) => {

    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");

    useEffect(() => {
      if(currency === "INR")    setSymbol("₹");
      else if(currency === "USD")    setSymbol("$");
    }, [currency])
    

  return <Crytpo.Provider value={{currency, symbol, setCurrency}}>{children}</Crytpo.Provider>
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crytpo);
}