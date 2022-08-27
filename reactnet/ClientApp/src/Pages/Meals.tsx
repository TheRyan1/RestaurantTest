import {Button, Grid, IconButton, MenuItem, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import CustomGrid from "../Components/CustomGrid";
import CustomToolbar from "../Components/CustomToolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReservationForm from "../Forms/ReservationForm";
import {useQuery} from "@tanstack/react-query";
import {getMeals} from "../API/Meal.API";
import {getRestaurants} from "../API/Restaurant.API";
import RestaurantType from "../Types/Restaurant.type";
import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {AddCircle} from "@mui/icons-material";
import ReservationType from "../Types/Reservation.type";
import MealForm from "../Forms/MealForm";
import {FoodTypes} from "../Constants/FoodTypes";
import {DrinkTypes} from "../Constants/DrinkTypes";
import {modalStyle} from "../CustomStyles/CustomStyles";
import {useParams} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';

function Meals() {
    const {restaurantID} = useParams()
    const navigate = useNavigate()
    const [selectedrestaurant, setSelectedRestaurant] = useState<any>(0);
    const [selectedReservation, setSelectedReservation] = useState<any>(0);
    const [open, setOpen] = React.useState(false);
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
    } = useQuery(["meals", selectedrestaurant], getMeals);

    const {
        data: restaurants = [],
    }: {
        data: any;
    } = useQuery(["restaurants"], getRestaurants);
    const [selectedForUpdate, setSelectedForUpdate] = useState<any>(null);
    const handleSelectedEntity = (id: number) => {
        let selectedEntity = data.find((x: ReservationType) => x.id == id);
        if (selectedEntity) {
            console.log(selectedEntity);
            setSelectedForUpdate(selectedEntity);
            setOpen(true);
            return;
        }
    };

    useEffect(() => {
        console.log(restaurantID)
        if (restaurantID) {
            setSelectedRestaurant(restaurantID)

        }
    }, [])

    const columns: GridColDef[] = [
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params: GridRenderCellParams<number>) => {
                return (
                    <div>
                        <IconButton
                            onClick={() => {
                                handleSelectedEntity(params.row.id);
                            }}>
                            < EditIcon/>
                        </IconButton>
                    </div>
                );
            },
        },
        {
            field: "Restaurant Name",
            headerName: "Restaurant Name",
            flex: 1,
            valueGetter: (params: GridRenderCellParams<number>) => {
                return params.row.restaurant.name;
            },
        },
        {
            field: "name",
            headerName: "Meal Name",
            flex: 1,

        },
        {
            field: "main",
            headerName: "Food",
            flex: 1,
            valueGetter: (params: GridRenderCellParams<number>) => {
                return FoodTypes.find((x: any) => x.value === params.row.main)?.text
            }
        },
        {
            field: "drink",
            headerName: "Drink",
            flex: 1,
            valueGetter: (params: GridRenderCellParams<number>) => {
                return DrinkTypes.find((x: any) => x.value === params.row.drink)?.text
            }

        },
        {
            field: "description",
            headerName: "Details",
            flex: 1,
            valueGetter: (params: GridRenderCellParams<number>) => {
                return params.row.description;
            },
        },

    ];
    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {selectedForUpdate
                            ? `Update the set meal ${
                                restaurants.find((x: any) => x.id == selectedrestaurant)?.name
                            }`
                            : `Create a set meal for ${
                                restaurants.find((x: any) => x.id == selectedrestaurant)?.name
                            }`}
                    </Typography>

                    <MealForm
                        setModal={setOpen}
                        refetch={refetch}
                        updateItem={selectedForUpdate}
                        restaurantID={selectedrestaurant}
                    />
                </Box>
            </Modal>
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <Typography sx={{textAlign: "left", mb: 3}} variant={"h3"}>
                        Manage Meals
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={"Select a restaurant"}
                        fullWidth
                        select
                        defaultValue={0}
                        value={selectedrestaurant}
                        onChange={({target}) => {
                            setSelectedRestaurant(target.value);
                        }}
                    >
                        <MenuItem value={0}>All</MenuItem>
                        {restaurants &&
                            restaurants.map((restaurant: RestaurantType) => {
                                return (
                                    <MenuItem key={restaurant?.id} value={restaurant?.id}>
                                        {restaurant?.name}
                                    </MenuItem>
                                );
                            })}
                    </TextField>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "left",
                    }}
                >
                    <Button
                        disabled={selectedrestaurant === 0}
                        startIcon={<AddCircle/>}
                        onClick={() => {
                            setSelectedForUpdate(null);
                            setOpen(!open);
                        }}
                    >
                        Add Meal
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
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Meals;
