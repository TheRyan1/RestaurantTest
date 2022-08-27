import { PlayCircleFilledWhite } from "@mui/icons-material";
import { createTheme, FormControl, FormLabel } from "@mui/material";
import { color, padding, palette, textAlign } from "@mui/system";

export const theme = createTheme({
    palette: {
     primary: {
       light: '#757ce8',
       main: '#233043',
       dark: '#002884',
       contrastText: '#fff',
     },
     secondary: {
       light: '#ff7961',
       main: '#f44336',
       dark: '#ba000d',
       contrastText: '#000',
     },
    }
    
})