import React, {useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import RestaurantType from "../Types/Restaurant.type";
import LoadingButton from "../Components/LodingButton";
import {FormControlLabel, Grid, Switch, TextField, Typography,} from "@mui/material";
import {toast} from 'react-toastify';
import {useMutation} from "@tanstack/react-query";
import {createUpdate} from "../API/Restaurant.API";
import {AxiosError} from "axios";

function RestaurantForm({
                            updateItem,
                            refetch,
                            setModal,
                        }: {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    updateItem: RestaurantType | null;
    refetch: any;
}) {
    const {
        mutate: update,
        data,
        isSuccess,
        isLoading,
        status,
        error
    } = useMutation(createUpdate, {
        onSuccess: (res: any) => {
            toast(res)
            refetch();
        },
        onError: (error: AxiosError) => {

            toast(error.message)
        },
    });

    const {
        handleChange,
        values,
        errors,
        setFieldTouched,
        submitForm,
        setFieldValue,
        initialValues,
        isValid,
    } = useFormik<RestaurantType>({
        enableReinitialize: true,
        initialValues: {
            id: 0,
            name: "",
            isActive: true,
        },
        onSubmit: (values) => {
            update(values);
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Required"),
        }),
    });
    //Trigger the validation on form load
    useEffect(() => {
        // setFieldTouched("name", true);
    }, []);
    // Update the form values with the entity that you want to change
    useEffect(() => {
        Object.entries(updateItem ? updateItem : initialValues).forEach(
            ([key, value]) => {
                console.log(key, value);
                setFieldValue(key, value);
            }
        );
    }, []);

    return (
        <Grid container rowSpacing={2}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="standard"
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors?.name}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            name={"isActive"}
                            checked={values?.isActive}
                            onChange={handleChange}
                        />
                    }
                    label="Active"
                />
            </Grid>
            <Grid item xs={12}>
                <LoadingButton isLoading={isLoading} submit={submitForm} valid={!isValid} closeModal={setModal}
                               label={"Save"}/>
                <Typography></Typography>
            </Grid>
        </Grid>
    );
}

export default RestaurantForm;
