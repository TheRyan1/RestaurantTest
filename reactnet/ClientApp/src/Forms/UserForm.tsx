import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {UserType} from "../Types/User.type";
import LoadingButton from "../Components/LodingButton";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {  toast } from 'react-toastify';
import { useMutation } from "@tanstack/react-query";
import { createUpdate } from "../API/User.API";
import { AxiosError } from "axios";
function UserForm({
  updateItem,
  refetch,
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateItem: UserType | null;
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
    onSuccess: (res:any) => {
      toast(res)
      refetch();
    },
    onError:(error:AxiosError)=> {
      
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
  } = useFormik<UserType>({
    enableReinitialize: true,
    initialValues: {
      id: "0",
      username: "",
      password:"",
      firstName:"",
      lastName:"",
      email:"",
      isActive: true,
      role:"Standard"
    },
    onSubmit: (values) => {
      update(values);
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Required"),
      email: Yup.string().email().required()
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

         {/**Email */}
         <Grid item xs={12}>
        <TextField
        fullWidth
        disabled={!!updateItem}
          variant="standard"
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </Grid>

      
         {/**Password */}
         <Grid item xs={12}>
        <TextField
        fullWidth
       
          variant="standard"
          type={"password"}
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </Grid>

            {/**Role */}
            <Grid item xs={12}>
        <TextField
        fullWidth
          variant="standard"
          label="Role"
          name="role"
          value={values.role}
          disabled={true}
        />
      </Grid>
      {/**UserName */}
      <Grid item xs={12}>
        <TextField
        fullWidth
          variant="standard"
          label="User Name"
          name="username"
          value={values.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors?.username}
        />
      </Grid>

        {/**Name */}
        <Grid item xs={12}>
        <TextField
        fullWidth
          variant="standard"
          label="Name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors?.firstName}
        />
      </Grid>

          {/**Surname */}
          <Grid item xs={12}>
        <TextField
        fullWidth
          variant="standard"
          label="Surname"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors?.firstName}
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
        <LoadingButton isLoading={isLoading} submit={submitForm} valid={!isValid} closeModal={setModal} label={"Save"} />
       <Typography></Typography>
      </Grid>
    </Grid>
  );
}

export default UserForm;
