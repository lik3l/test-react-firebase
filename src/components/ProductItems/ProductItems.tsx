import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import React, { useState } from 'react';
import { ProductModal } from '../ProductModal/ProductModal';
import { TProduct } from '../../types';


const productsMock: TProduct[] = [
  { name: "Item 1", qty: 1, price: 12.90 },
  { name: "Item 2", qty: 1, price: 12.90 },
  { name: "Item 3", qty: 22, price: 12.90 },
  { name: "Item 5", qty: 2, price: 12.90 },
  { name: "Item 1", qty: 1, price: 12.90 },
  { name: "Item 1", qty: 5, price: 12.90 },
  { name: "Item 1", qty: 1, price: 12.90 },
  { name: "Item 1", qty: 1, price: 12.90 },
  { name: "Item 1", qty: 1, price: 12.90 },
]

export const ProductItems = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
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
      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Table>
  );
}