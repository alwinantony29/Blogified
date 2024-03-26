import { Backdrop, CircularProgress } from "@mui/material";

export function Loader({ isLoading = true }) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
