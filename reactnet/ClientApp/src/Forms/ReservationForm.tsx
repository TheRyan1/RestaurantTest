import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReservationType from "../Types/Reservation.type";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LoadingButton from '../Components/LodingButton'
import {  toast } from 'react-toastify';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { createUpdate } from "../API/Reservation.API";
import {
  ReservationStatus,
  ReservationStatusForDropDown,
} from "../Constants/ReservationStatus";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AxiosError } from "axios";

function RestaurantForm({
  updateItem,
  restaurantID,
  refetch,
  setModal
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateItem: ReservationType | null;
  restaurantID: number;
  refetch:any
}) {
  const { mutate: update, data, isSuccess ,isLoading} = useMutation(createUpdate,{
    onSuccess:(res:any)=>{
      toast(res)
      refetch()
    },
    onError:(res:AxiosError)=>{
      toast(res.message)
    }
  });

  const {
    handleChange,
    values,
    errors,
    setFieldTouched,
    submitForm,
    setFieldValue,
    initialValues,
    isValid
  } = useFormik<ReservationType>({
    enableReinitialize: true,
    initialValues: {
      id: 0,
      startDateTime: new Date("2022-04-04T11:11:11"),
      RestaurantID: restaurantID,
      description: "",
      reservationsStatusEnum: 0,
      restaurant: null,
    },
    onSubmit: (values) => {
      update(values);
    },
    validationSchema: Yup.object().shape({
      RestaurantID: Yup.number().required(),
      description: Yup.string().required(),
      reservationsStatusEnum: Yup.mixed().oneOf(
        Object.values(ReservationStatus)
      ),
    }),
  });
  const handleDateChange = (newValue: Date | null ) => {
    setFieldValue("startDateTime", newValue);
  };
  //Trigger the validation on form load
  useEffect(() => {
    // setFieldTouched("name", true);
  }, []);
  // Update the form values with the entity that you want to change
  useEffect(() => {
    // Set the restaurantID

    Object.entries(updateItem ? updateItem : initialValues).forEach(
      ([key, value]) => {
        if (key === "startDateTime") {
          setFieldValue("startDateTime", value);
        } else {
          setFieldValue(key, value);
        }
      }
    );
  }, []);

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
         
            label="Start Date time"
            value={values.startDateTime}
            //name={"startDateTime"}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params}  sx={{
              mt:3
            }} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <TextField
        fullWidth
          variant="standard"
          label="Details"
          name="description"
          value={values.description}
          onChange={handleChange}
          error={!!errors.description}
          // helperText={errors?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
        fullWidth
          select
          variant="standard"
          label="Status"
          name="reservationsStatusEnum"
          value={values.reservationsStatusEnum}
          onChange={handleChange}
          // error={!!errors.name}
          // helperText={errors?.name}
        >
          {ReservationStatusForDropDown.map((constant: any) => {
            return (
              <MenuItem key={constant.key} value={constant.key}>
                {constant.text}
              </MenuItem>
            );
          })}
        </TextField>
      </Grid>

      <Grid item xs={12}>
      <LoadingButton isLoading={isLoading} submit={submitForm} valid={!isValid} closeModal={setModal} label={"Save"} /> 
      </Grid>
    </Grid>
  );
}

export default RestaurantForm;
