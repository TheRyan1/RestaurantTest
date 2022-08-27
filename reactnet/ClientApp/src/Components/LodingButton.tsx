import {Button, CircularProgress, Grid} from "@mui/material";
import React from "react";

function LodingButton({
                          isLoading,
                          label,
                          submit,
                          closeModal,
                          valid
                      }: {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    label: string;
    submit: () => void;
    valid: boolean
}) {
    return (
        <>
            {isLoading ? (
                <Grid item xs={12}>
                    <CircularProgress/></Grid>
            ) : (<>
                    <Grid item xs={12}>
                        <Button sx={{marginRight: 2}} disabled={valid} color='success' variant="contained"
                                onClick={submit}>Save</Button>
                        <Button color="warning" variant="contained"
                                onClick={() => closeModal(false)}>Close</Button></Grid>
                </>
            )}
        </>
    );
}

export default LodingButton;
