import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OrderType from "../Types/Order.type";
import {Grid} from "@mui/material";
import {ReservationStatusForDropDown} from "../Constants/ReservationStatus";

const bull = (
    <Box
        component="span"
        sx={{display: "inline-block", mx: "10px", transform: "scale(0.8)"}}
    >
        •
    </Box>
);

export default function OrderCard({
                                      data,
                                      openModal,
                                      handleSelectedEntity,
                                  }: {
    data: OrderType;
    openModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleSelectedEntity: (id: number) => void;
}) {
    return (
        <div>
            <Card sx={{minWidth: 275, mr: 2, border: "1px solid grey"}}>
                <CardContent>
                    <Grid rowSpacing={4}>
                        <Grid item xs={12}>
                            <Typography
                                sx={{fontSize: 14}}
                                color="text.secondary"
                                gutterBottom
                            >
                                {data?.reservation?.restaurant?.name}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="div">{data.meal?.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {" "}
                            <Typography component="div">
                                Description : {data?.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="div">
                                Status :{" "}
                                {
                                    ReservationStatusForDropDown.find(
                                        (x: any) =>
                                            x.key === data?.reservation?.reservationsStatusEnum
                                    )?.text
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => {
                            handleSelectedEntity(data.id);
                            openModal(true);
                        }}
                    >
                        Edit
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
