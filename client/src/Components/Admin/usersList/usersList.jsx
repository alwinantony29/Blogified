import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Backdrop, Box, Button, CircularProgress } from '@mui/material';
import { axiosInstance } from '../../../config/axios';
import toast from 'react-hot-toast';

const usersList = () => {

    const [users, setUsers] = useState([])
    const [isloading, setIsloading] = useState(true)

    const loader = async () => {
        try {
            setIsloading(true)
            const response = await axiosInstance.get("/users")
            const { allUsers } = response.data
            setUsers(allUsers)
            setIsloading(false)

        } catch (error) {
            setIsloading(false)
            toast.error("Couldn't load users")
            console.error(error);
        }
    }

    useEffect(() => {
        loader()
    }, [])

    const handleStatus = async (id, status) => {
        try {
            if (status === "active") status = "blocked"
            else if (status === "blocked") status = "active"
            console.log("updating ", id, " to", status)
            const result = await axiosInstance.patch("/users", { userId: id, status })
            const { updatedUser } = result.data
            const updatedArrayOfUsers = users.map(user => {
                if (user._id === id) {
                    user.status = updatedUser.status;
                }
                return user;
            })
            setUsers(updatedArrayOfUsers)

        } catch (error) {
            toast.error("Couldn't update user status")
            console.log(`Error updating ${id}:`, error?.response?.data?.message || error)
        }
    }

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
                                <TableCell align="center">Profile pic</TableCell>
                                <TableCell align="center">User&nbsp;Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => {
                                const { _id, userName, email, status, userImageURL } = user
                                return (
                                    <TableRow
                                        key={_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row" sx={{ width: "100px" }}>
                                            <Avatar src={userImageURL} alt={userName} />
                                        </TableCell>
                                        <TableCell align="center">{userName}</TableCell>
                                        <TableCell align="center">{email}</TableCell>
                                        <TableCell align="center" sx={{ width: "100px" }}>
                                            {status}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => handleStatus(_id, status)} sx={{ width: "100px" }} variant='outlined'>
                                                {status === "active" ? "Block" : "Unblock"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default usersList