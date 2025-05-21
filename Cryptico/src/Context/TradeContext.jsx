import React, { Children, useContext } from 'react'
import { InititateTrade } from '../api/tradeService'

const TradeContext = React.createContext()
const TradeProvider = ({children}) => {

    const handleTradeInitiate = async (data) => {
        const response = await InititateTrade(data);
        return response;
    }
    return (
        <TradeContext.Provider value={{handleTradeInitiate}}>
            {children}
        </TradeContext.Provider>
    )
}
export const useTradeProvider = () => useContext(TradeContext);

export default TradeProvider