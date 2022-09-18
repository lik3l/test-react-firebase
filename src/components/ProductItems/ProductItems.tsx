import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import { ProductModal } from '../ProductModal/ProductModal';
import { TProduct } from '../../types';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

export const ProductItems = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [productForEdit, setProductForEdit] = useState<TProduct|null>(null);
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
  }, [currentUser]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleEdit = (product: TProduct) => {
    if (!product.id) {
      return;
    }
    setProductForEdit(product);
    setModalOpen(true);
  }
  const handleAddProduct = () => {
    setProductForEdit(null);
    setModalOpen(true);
  }

  return (
    <Box>
      <Box display='flex' justifyContent="flex-end">
        <Button onClick={handleAddProduct} variant='outlined'><Add /> Add item</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {["Product name", "Qty", "Price", "Total", ''].map((label) => <TableCell key={label}>{label}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length ? products.map((product, idx) => <TableRow key={idx}>
            <TableCell>{product.name}</TableCell>
            <TableCell width={2}>{product.qty}</TableCell>
            <TableCell width={3}>${product.price.toFixed(2)}</TableCell>
            <TableCell width={4}>${(product.qty * product.price).toFixed(2)}</TableCell>
            <TableCell width={3} align='right'>
              <Box justifyContent='flex-end' display='flex' alignItems='center'>
                <IconButton size='small' onClick={() => handleEdit(product)}><Edit /></IconButton>
                <IconButton size='small'><Delete /></IconButton>
              </Box>
            </TableCell>
          </TableRow>)
            : <TableRow>
              <TableCell colSpan={5} align="center">
                <Box display="flex" alignItems="center" flexDirection="column">
                  <Typography mb={1}>You have no items.</Typography>
                  <Button onClick={handleAddProduct} size="small" variant='outlined'><Add /> Add item</Button>
                </Box>
              </TableCell>
            </TableRow>
          }
        </TableBody>
        <ProductModal 
          product={productForEdit} 
          open={modalOpen} 
          onSave={() => loadProducts()} 
          onClose={() => setModalOpen(false)} />
      </Table>
    </Box>
  );
}