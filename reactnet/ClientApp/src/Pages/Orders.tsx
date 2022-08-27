import { Button, Grid, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomGrid from "../Components/CustomGrid";
import CustomToolbar from "../Components/CustomToolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReservationForm from "../Forms/ReservationForm";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../API/Order.API";
import { getRestaurants } from "../API/Restaurant.API";
import RestaurantType from "../Types/Restaurant.type";
import { useParams } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
import OrderCard from "../Components/OrderCard";
import OrderType from "../Types/Order.type";
import OrderForm from "../Forms/OrderForm";
import { modalStyle } from "../CustomStyles/CustomStyles";

function Orders() {
  const { reservationID, restaurantID } = useParams();
  const [selectedrestaurant, setSelectedRestaurant] = useState<any>(0);
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
  } = useQuery(["orders", reservationID, 0], getOrders, {
    onSuccess: (order: OrderType) => {
      setSelectedRestaurant(order.reservation?.restaurant?.id);
    },
  });

  const {
    data: restaurants = [],
  }: {
    data: any;
  } = useQuery(["restaurants"], getRestaurants);
  const [selectedForUpdate, setSelectedForUpdate] = useState<any>(null);
  const handleSelectedEntity = (id: number) => {
    let selectedEntity = data.find((x: OrderType) => x.id == id);
    if (selectedEntity) {
      console.log(selectedEntity);
      setSelectedForUpdate(selectedEntity);
      setOpen(true);
      return;
    }
  };

  return (
    <Grid container >
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
            {selectedForUpdate ? `Update Order` : `Create Order `}
          </Typography>

          <OrderForm
            refetch={refetch}
            setModal={setOpen}
            updateItem={selectedForUpdate}
            reservationID={reservationID ? parseInt(reservationID) : 0}
            restaurantID={restaurantID ? parseInt(restaurantID) : 0}
          />
        </Box>
      </Modal>
      <Grid container rowGap={2}>
        <Grid item xs={12}>
          <Typography sx={{ textAlign: "left", mb: 3 }} variant={"h3"}>
            Manage Orders for Reservation
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display:"flex",
            justifyContent:"left",
          }}
        >
          <Button
           
            disabled={selectedrestaurant === 0}
            startIcon={<AddCircle />}
            onClick={() => {
              setSelectedForUpdate(null);
              setOpen(!open);
            }}
          >
            Add Order
          </Button>
        </Grid>

        {data &&
          data.map((e: any) => {
            return (
              <OrderCard
                handleSelectedEntity={handleSelectedEntity}
                openModal={setOpen}
                key={e.id}
                data={e}
              />
            );
          })}
      </Grid>
    </Grid>
  );
}

export default Orders;
