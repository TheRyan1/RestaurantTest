import React, {useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createUpdate} from "../API/Order.API";
import {getMeals} from "../API/Meal.API";
import OrderType from "../Types/Order.type";
import {toast} from 'react-toastify';
import {AxiosError} from "axios";
import LoadingButton from '../Components/LodingButton';

function OrderForm({
                       updateItem,
                       reservationID,
                       restaurantID,
                       refetch,
                       setModal,
                   }: {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    updateItem: OrderType | null;
    reservationID: number;
    restaurantID: number;
    refetch: () => void;
}) {
    const {
        mutate: update,
        data,
        isSuccess,
        isLoading
    } = useMutation(createUpdate, {
        onSuccess: (res: any) => {
            toast(res)
            refetch();
        },
        onError: (error: AxiosError) => {

            toast(error.message)
        },
    });
    const {data: meals = []}: { data: any } = useQuery(
        ["meals", restaurantID],
        getMeals
    );
    const {

        isValid,
        handleChange,
        values,
        errors,
        setFieldTouched,
        submitForm,
        setFieldValue,
        initialValues,
    } = useFormik<OrderType>({
        enableReinitialize: true,
        initialValues: {
            id: 0,
            reservationID: reservationID,
            mealID: 0,
            description: "",
            reservation: null,
            meal: null,
        },
        onSubmit: (values) => {
            update(values);
        },
        validationSchema: Yup.object().shape({
            description: Yup.string().required(),
            mealID: Yup.number().test(
                'mealID',
                'Please select a meal',
                function (value) {
                    return value != 0;
                }
            )


        }),
    });
    //Trigger the validation on form load
    useEffect(() => {
        // setFieldTouched("name", true);
    }, []);
    // Update the form values with the entity that you want to change
    useEffect(() => {
        // Update the props of the intial values
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
                {meals.length < 1 && <Typography>There are not set meals create for this Restaurant yet</Typography>}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    fullWidth
                    variant="standard"
                    label="Meal"
                    name="mealID"
                    value={values.mealID}
                    onChange={handleChange}
                    error={!!errors.mealID}
                    helperText={errors?.mealID}
                >
                    <MenuItem value={0}>Select a meal</MenuItem>
                    {meals &&
                        meals.map((e: any) => {
                            return (
                                <MenuItem key={e.id} value={e.id}>
                                    {e.name}
                                </MenuItem>
                            );
                        })}
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="standard"
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    // helperText={errors?.name}
                />
            </Grid>

            <Grid item xs={12}>
                <LoadingButton isLoading={isLoading} submit={submitForm} valid={!isValid} closeModal={setModal}
                               label={"Save"}/>
            </Grid>
        </Grid>
    );
}

export default OrderForm;
