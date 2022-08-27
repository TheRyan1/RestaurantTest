import {Button, Grid, IconButton} from "@mui/material";
import React, {useEffect, useState} from "react";
import CustomGrid from "../Components/CustomGrid";
import CustomToolbar from "../Components/CustomToolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RestaurantForm from "../Forms/RestaurantForm";
import {useQuery} from "@tanstack/react-query";
import {getUsers} from "../API/User.API";
import RestaurantType from "../Types/Restaurant.type";
import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import ActiveButton from "../Components/ActiveButton";
import {AddCircle} from "@mui/icons-material";
import {useStore} from "../Providers/Store";
import {UserType} from "../Types/User.type";
import UserForm from "../Forms/UserForm";
import {modalStyle} from "../CustomStyles/CustomStyles";
import EditIcon from '@mui/icons-material/Edit';

function Users() {

    const {
        data = [],
        isLoading,
        status,
        refetch,
    }: {
        data: any;
        isLoading: boolean;
        status: string;
        refetch: () => void;
    } = useQuery(["users"], getUsers);
    const [selectedForUpdate, setSelectedForUpdate] = useState<any>(null);
    const handleSelectedEntity = (id: string) => {
        let selectedEntity = data.find((x: UserType) => x.id == id);
        if (selectedEntity) {
            setSelectedForUpdate(selectedEntity);
            setOpen(true);
            return;
        }
    };
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        // Fetch the new data if a new restaurant is created
        !open && refetch();
    }, [open]);


    const columns: GridColDef[] = [
        {
            field: "actions",
            headerName: "Actions",
            width: 90,
            renderCell: (params: GridRenderCellParams<number>) => {
                return (
                    <div>
                        <IconButton onClick={() => {
                            handleSelectedEntity(params.row.id);
                        }}><EditIcon/></IconButton>


                    </div>
                );
            },
        },
        {field: "firstName", headerName: "Name", flex: 1},
        {field: "lastName", headerName: "Surname", flex: 1},
        {field: "username", headerName: "UserName", flex: 1},
        {field: "email", headerName: "Email", flex: 1},
        {field: "role", headerName: "Role", flex: 1},

        {
            field: "isActive",
            headerName: "Status",
            flex: 1,
            editable: true,
            renderCell: (params: GridRenderCellParams<number>) => {
                return <ActiveButton status={params.row.isActive}/>;
            },
            valueGetter: (params: GridRenderCellParams<number>) => {
                return params.row.isActive ? "Active" : "Inactive";
            },
        },
    ];
    return (
        <Grid container rowGap={2}>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Grid container>

                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {selectedForUpdate ? "Update User" : "Create User"}
                        </Typography>

                        <UserForm updateItem={selectedForUpdate} refetch={refetch} setModal={setOpen}/>
                    </Grid>
                </Box>
            </Modal>
            <Typography sx={{textAlign: "left", mb: 3}} variant={"h3"}>
                Manage Users
            </Typography>
            <Grid
                item
                xs={12}
                sx={{
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Button
                    startIcon={<AddCircle/>}
                    onClick={() => {
                        setOpen(!open);
                        setSelectedForUpdate(null);
                    }}
                >
                    Add User
                </Button>
            </Grid>
            <Grid item xs={12}>


                <CustomGrid
                    Toolbar={CustomToolbar}
                    loading={isLoading}
                    rowData={data}
                    modalState={open}
                    setModalState={setOpen}
                    columns={columns}
                /> </Grid>
        </Grid>
    );
}

export default Users;
