import React, {useState} from "react";
import Graph from "../components/Graph";
import CoordinatesForm from "../components/CoordinatesForm";
import MainHeader from "../components/MainHeader";
import ResultTable from "../components/ResultTable";
import {useSelector} from "react-redux";

export default function MainPage(){
    const [results, setResults] = useState([]);

    const handleAddResult = (result: any) => {
        setResults((prevResults) => [...prevResults, result]);
    };

    const handleClearResults = () => {
        setResults([]);
    };

    return (
        <div className="flex justify-between w-screen h-screen">
            <div className="fixed top-0 left-0 w-full header-shadow z-50">
                <MainHeader/>
            </div>
            <div className="flex ml-10 flex-col justify-center">
                <CoordinatesForm onAddResult={handleAddResult} />
            </div>
            <div className="flex flex-col justify-center grow-0 space-y-4">
                <Graph width={300} height={300}/>
            </div>
            <div>
                <ResultTable results={results} onClearResults={handleClearResults}/>
            </div>
        </div>
    )
}