import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { axiosInstance } from '../../../config/axios';

const usersList = () => {
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein }
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ]
    const [users, setUsers] = useState([])
    const [isloading, setIsloading] = useState(true)

    const loader = async () => {
        try {
            setIsloading(true)
            const response = await axiosInstance.get("/users")
            console.log(response);
            setIsloading(false)

        } catch (error) {
            setIsloading(false)
            console.log(error);
        }
    }
    useEffect(() => {
        console.log("userList useEffect");
        loader()
    }, [])
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: 10 }}
                open={isloading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ mt: 5, display: "flex", justifyContent: 'center' }} >
                <TableContainer sx={{ minWidth: 550, maxWidth: "90dvw" }} component={Paper}>
                    <Table aria-label="user table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default usersList