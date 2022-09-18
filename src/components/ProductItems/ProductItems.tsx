import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import { ProductModal } from '../ProductModal/ProductModal';
import { TProduct } from '../../types';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

export const ProductItems = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {currentUser} = useAuth();

  const loadProducts = useCallback(async () => {
    if (!currentUser) {
      return;
    }
    const q = query(collection(db, "users", currentUser.uid, 'products'));
    const data = await getDocs(q);
    setProducts(data.docs
      .map(doc => ({id: doc.id, ...doc.data() as TProduct}))
    );
  }, [])

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <Box>
      <Box display='flex' justifyContent="flex-end">
        <Button onClick={() => setModalOpen(true)} variant='outlined'><Add /> Add item</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {["Product name", "Qty", "Price", "Total"].map((label) => <TableCell key={label}>{label}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length ? products.map((product, idx) => <TableRow key={idx}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.qty}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>${(product.qty * product.price).toFixed(2)}</TableCell>
          </TableRow>)
            : <TableRow>
              <TableCell colSpan={4} align="center">
                <Box display="flex" alignItems="center" flexDirection="column">
                  <Typography mb={1}>You have no items.</Typography>
                  <Button onClick={() => setModalOpen(true)} size="small" variant='outlined'><Add /> Add item</Button>
                </Box>
              </TableCell>
            </TableRow>
          }
        </TableBody>
        <ProductModal open={modalOpen} onSave={() => loadProducts()} onClose={() => setModalOpen(false)} />
      </Table>
    </Box>
  );
}