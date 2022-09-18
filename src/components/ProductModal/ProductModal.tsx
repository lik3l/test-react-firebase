import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import { doc, setDoc, FirestoreError, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { TModalProps, TProduct } from '../../types';

const blankProduct: TProduct = {
  name: "",
  qty: 0,
  price: 0
}

type TProps = TModalProps & {}
export const ProductModal: React.FC<TProps> = ({ open, onClose }) => {
  const [itemForm, setItemForm] = useState<TProduct>(blankProduct);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {currentUser} = useAuth();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
    setError('');
    setItemForm({ ...itemForm, [name]: value });
  }
  const handleSave = async () => {
    const { name, price, qty } = itemForm;
    if (![name, price, qty].every(el => Boolean(el))) {
      return setError('Please fill all data');
    }
    if (!currentUser) {
      return setError('Please log in');
    }
    setError('');
    setLoading(true);
    try {
      const docRef = doc(collection(db, 'users', currentUser.uid, 'products'));
      await setDoc(docRef, {name, qty, price});
      onClose();
    } catch (e) {
      const err = e as FirestoreError;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return <Dialog
    open={open}
    onClose={onClose}
  >
    <Box p={2}>
      <Typography mb={2} align="center" variant="h4">Add new item:</Typography>
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
      {error && <Typography mb={1} align='center' color="red">{error}</Typography>}
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button onClick={onClose} color="error" variant="outlined">Close</Button>
        <Button disabled={loading} onClick={handleSave} variant="contained">Save</Button>
      </Box>
    </Box>
  </Dialog>
}