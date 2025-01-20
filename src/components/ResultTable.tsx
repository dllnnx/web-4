import React from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ResultTable() {
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
                        <TableCell>выполнение</TableCell>
                        <TableCell>текущее время</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
    
                </TableBody>
            </Table>
            </TableContainer>
            <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}>
                удалить
            </Button>
        </div>
    );
}