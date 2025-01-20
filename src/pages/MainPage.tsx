import React from "react";
import Graph from "../components/Graph";
import CoordinatesForm from "../components/CoordinatesForm";
import {Button} from "@mui/material";
import MainHeader from "../components/MainHeader";
import DeleteIcon from '@mui/icons-material/Delete';
import ResultTable from "../components/ResultTable";

export default function MainPage(){
    return (
        <div className="flex justify-between w-screen h-screen">
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <MainHeader/>
            </div>
            <div className="flex ml-10 flex-col justify-center">
                <CoordinatesForm/>
            </div>
            <div className="flex flex-col justify-center grow-0 space-y-4">
                <Graph width={300} height={300}/>

            </div>
            <div>
                <ResultTable />
            </div>
        </div>
    )
}