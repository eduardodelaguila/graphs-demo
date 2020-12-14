import { createContext, useState, useEffect, useCallback, useRef } from "react";

import { generator } from "../mock/generator";

export const DataContext = createContext({
    data: {},
    start: null,
    end: null,
    length: 0,
});

const DataContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalLength, setTotalLength] = useState(20);
    const firstSuggestionRef = useRef(true);

    const handleDataRequest = useCallback((mock) => {
        if (mock) {
            setData(mock);
        }
    }, []);

    useEffect(() => {
        if (!firstSuggestionRef.current) {
            handleDataRequest(generator(null, startDate, endDate));
        }
    }, [startDate, endDate, handleDataRequest]);

    useEffect(() => {
        if (!firstSuggestionRef.current) {
            handleDataRequest(generator(totalLength));
        }
    }, [totalLength, handleDataRequest]);

    const greenLight = () => {
        firstSuggestionRef.current = false;
    };

    return (
        <DataContext.Provider
            value={{
                data,
                startDate,
                endDate,
                totalLength,
                setData,
                setStartDate,
                setEndDate,
                setTotalLength,
                greenLight,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;
