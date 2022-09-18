import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TModalProps, TProduct } from '../../types';

const blankProduct: TProduct = {
  name: "",
  qty: 0,
  price: 0
}

type TProps = TModalProps & {}
export const ProductModal: React.FC<TProps> = ({ open, onClose }) => {
  const [itemForm, setItemForm] = useState<TProduct>(blankProduct);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
    setItemForm({ ...itemForm, [name]: value });
  }

  return <Dialog
    open={open}
    onClose={onClose}
  >
    <Box p={2}>
      <Typography mb={2} variant="h4">Add new item:</Typography>
      <Box mb={2} display="flex" flexDirection="column" gap={1}>
        <TextField
          onChange={handleChange}
          name="name"
          value={itemForm.name}
          label={"Product name"}
          variant="standard" />
        <Box display="grid" gap={2} gridTemplateColumns="1fr 3fr">
          <TextField
            onChange={handleChange}
            name="qty"
            value={itemForm.qty}
            type="number"
            label={"Qty"}
            variant="standard" />
          <TextField
            onChange={handleChange}
            name="price"
            value={itemForm.price}
            type="number"
            label={"Price"}
            variant="standard" />
        </Box>
        <TextField
          value={`$${(itemForm.qty * itemForm.price).toFixed(2)}`}
          disabled
          label={"Total"}
          variant="standard" />
      </Box>
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button onClick={onClose} color="error" variant="outlined">Close</Button>
        <Button variant="contained">Save</Button>
      </Box>
    </Box>
  </Dialog>
}