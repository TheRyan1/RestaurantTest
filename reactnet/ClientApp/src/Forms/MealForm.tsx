import React, {useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {AxiosError} from "axios";
import LoadingButton from "../Components/LodingButton";
import {
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {createUpdate} from "../API/Meal.API";
import MealType from "../Types/Meal.type.ts";
import {FoodTypes} from "../Constants/FoodTypes";
import {DrinkTypes} from "../Constants/DrinkTypes";
import {toast} from "react-toastify";

function MealForm({
                      updateItem,
                      restaurantID,
                      refetch,
                      setModal,
                  }: {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: any;
    updateItem: MealType | null;
    restaurantID: number;
}) {
    const {
        mutate: update,
        data,
        isSuccess,
        isLoading,
    } = useMutation(createUpdate, {
        onSuccess: (res: any) => {
            toast(res);
            refetch();
        },
        onError: (error: AxiosError) => {
            toast(error.message);
        },
    });
    const mealValidationSchema = Yup.object().shape({
        name: Yup.string().required(),
        main: Yup.string().test(
            'main',
            'Please select type',
            function (value) {
                return value != "0";
            }
        ),
        drink: Yup.string().test(
            'drink',
            'Please select type',
            function (value) {
                return value != "0";
            }
        ),
        description: Yup.string().required(),
    })
    const {
        handleChange,
        isValid,
        values,
        errors,
        setFieldTouched,
        submitForm,
        setFieldValue,
        initialValues,
    } = useFormik<MealType>({
        enableReinitialize: true,
        initialValues: {
            id: 0,
            name: "",
            main: "0",
            drink: "0",
            description: "",
            restaurantID: restaurantID,
            restaurant: null,
        },
        validationSchema: mealValidationSchema,
        onSubmit: (values) => {
            update(values);
        },
        // validationSchema: Yup.object().shape({
        //   RestaurantID: Yup.number().required(),
        //   description: Yup.string().required(),
        //   reservationsStatusEnum: Yup.mixed().oneOf(
        //     Object.values(ReservationStatus)
        //   ),
        // }),
    });
    const handleDateChange = (newValue: Date | null) => {
        setFieldValue("startDateTime", newValue);
    };
    //Trigger the validation on form load
    useEffect(() => {
        setFieldTouched("name", true);
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
                <TextField
                    fullWidth
                    variant="standard"
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={"Name of the meal"}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    fullWidth
                    variant="standard"
                    label="Main Serving"
                    name="main"
                    value={values.main}
                    onChange={handleChange}
                    error={!!errors.main}
                    helperText={errors.main}
                >
                    <MenuItem value={0}>
                        All
                    </MenuItem>
                    {FoodTypes.map((e: any) => {
                        return (
                            <MenuItem key={e.key} value={e.value}>
                                {e.text}
                            </MenuItem>
                        );
                    })}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    fullWidth
                    variant="standard"
                    label="Drink Serving"
                    name="drink"
                    value={values.drink}
                    onChange={handleChange}
                    error={!!errors.drink}
                    helperText={errors.drink}
                >
                    <MenuItem value={0}>
                        All
                    </MenuItem>
                    {DrinkTypes.map((e: any) => {
                        return (
                            <MenuItem key={e.key} value={e.value}>
                                {e.text}
                            </MenuItem>
                        );
                    })}
                </TextField>
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

                />
            </Grid>

            <Grid item xs={12}>
                <LoadingButton
                    isLoading={isLoading}
                    submit={submitForm}
                    valid={!isValid}
                    closeModal={setModal}
                    label={"Save"}
                />
            </Grid>
        </Grid>
    );
}

export default MealForm;
