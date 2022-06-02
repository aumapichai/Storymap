import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { NextPage } from "next";
import React from "react";

const BoxImages = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "150px",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "8px",
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  margin: "8px 0 8px 0",
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogMine: NextPage<any> = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleClickOpen}>ดูเพิ่มเติม</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ paddingBottom: "0 !important" }}
        >
          <Typography variant="titleMain">{`${props.title}ของปลานิล`}</Typography>
        </DialogTitle>
        <DialogContent>
          <BoxImages sx={{ backgroundImage: `url(${props.image})` }} />
          <DialogContentText
            id="alert-dialog-description"
            sx={{ paddingTop: "8px", textIndent: "16px" }}
          >
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            ปิด
          </Button>
          {/* <Button onClick={handleClose} autoFocus>
          Agree
        </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogMine;
