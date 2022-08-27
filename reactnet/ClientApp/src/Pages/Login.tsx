import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useStore } from "../Providers/Store";
import { Authenticate, doLogin, getCurrentUser } from "../API/Auth";
import { toast } from "react-toastify";

function Login({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    try{
      let res = await doLogin({ email, password });
      toast("Success")
      setLoggedIn(res);
      window.location.pathname = "/restaurants"
    }catch(err:any){
      toast(err.response.data)
  
    }
  
  };

  return (
    <Grid
      container
      rowGap={4}
      sx={{
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
      }}
    >
      <Grid
        container
        rowGap={4}
        sx={{
          width: 300,
          boxShadow: "1px 1px 1px 2px grey",
          borderRadius: 5,
          padding: 5,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4">LOGIN</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="standard"
            label={"Email"}
            onChange={({ target }) => setEmail(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type={"password"}
            variant="standard"
            label={"Password"}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant={"contained"} onClick={() => login()}>
            {" "}
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
