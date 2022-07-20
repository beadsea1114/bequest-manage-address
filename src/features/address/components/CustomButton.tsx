import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { produceWithPatches } from "immer";

export const CustomButton = styled(Button, {
  shouldForwardProp: (prop: string) => true
})({
  borderRadius: "17px",
  fontWeight: 300,
  fontSize: ".8125rem",
  height: "34px",
  lineHeight: "34px",
  textAlign: "center",
  padding: "0 25px",
  margin: "0 10px",
  transition: "all .15s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    opacity: 1,
  }
});

export const PrimaryButton = styled(CustomButton, {
  shouldForwardProp: (prop: string) => true
})({
  backgroundColor: "#ff4c50",
  color: "white",
  "&:hover": {
    backgroundColor: "#ff4c50",
    color: "white"
  }
})

export const SecondaryButton = styled(CustomButton, {
  shouldForwardProp: (prop: string) => true
})({
  backgroundColor: "#343a40",
  color: "white",
  "&:hover": {
    backgroundColor: "#343a40",
    color: "white"
  }
})