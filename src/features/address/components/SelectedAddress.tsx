import { Box, Divider, Typography } from "@mui/material"
import { useAppSelector } from "../../../app/hooks";
import { getSelectedAddress } from "../addressSlice";

const SelectedAddress = () => {
  const address = useAppSelector(getSelectedAddress);

  return (
    <Box display={"flex"} flexDirection={"column"} textAlign={"right"}>
      <Typography variant="h5" fontWeight={600} fontSize={"1rem"}>Selected Address</Typography>
      <Divider />
      <Typography textAlign={"right"} fontSize={"1.2rem"}>
        {!address ? '-' : Object.values(address).slice(1).filter(v => v).join(", ")}
      </Typography>
    </Box>
  )
}
export default SelectedAddress;