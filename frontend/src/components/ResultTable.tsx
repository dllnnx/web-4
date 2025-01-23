import React, {useState} from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Result {
    x: number;
    y: number;
    r: number;
    isHit: boolean;
    scriptTime: number;
    startTime: string;
}

interface ResultTableProps {
    results: Result[];
    onClearResults: () => void;
}

export default function ResultTable({ results, onClearResults }: ResultTableProps) {
    // const [results, setResults] = useState<Result[]>([]);

    // const handleAddResult = (newResult: Result) => {
    //     setResults((prevResults) => [...prevResults, newResult]);
    // };
    //
    // const handleClearResults = () => {
    //     setResults([]);
    // };

    return (
        <div className="mr-4 space-y-4">
            <TableContainer component={Paper} className="mt-16">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>x</TableCell>
                        <TableCell>y</TableCell>
                        <TableCell>r</TableCell>
                        <TableCell>результат</TableCell>
                        <TableCell>выполнение (мс)</TableCell>
                        <TableCell>дата и время</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((result, index) => (
                        <TableRow key={index}>
                            <TableCell>{result.x}</TableCell>
                            <TableCell>{result.y}</TableCell>
                            <TableCell>{result.r}</TableCell>
                            <TableCell>{result.isHit ? "попадание" : "мимо"}</TableCell>
                            <TableCell>{result.scriptTime}</TableCell>
                            <TableCell>{result.startTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={onClearResults}
            >
                удалить
            </Button>
        </div>
    );
}