import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../app/models/product';
import agent from '../../app/api/agent';
import NotFound from '../../app/errors/NotFound';
import Loading from '../../app/layout/Loading';
import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';

const ProductDetails = () => {
  const {basket, setBasket, removeItem} = useStoreContext();
  const {id} = useParams<{id: string}>(); //everything from url is a string
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    //fetch if we only have id
    id && agent.Catalog.details(parseInt(id))
      .then(resp => setProduct(resp))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id, item])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) >= 0) setQuantity(parseInt(event.currentTarget.value))
  }

  const handleUpdateCart = () => {
    if (!product) return;
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product.id, updatedQuantity)
        .then(basket => setBasket(basket))
        .catch(err => console.log(err))
        .finally(() => setSubmitting(false))
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product.id, updatedQuantity)
        .then(() => removeItem(product.id, updatedQuantity))
        .catch(err => console.log(err))
        .finally(() => setSubmitting(false))
    } 
  }

  if (loading) return <Loading message='Loading product...' />

  if (!product) return <NotFound />

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{mg:2}}/>
        <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField 
              variant='outlined'
              type='number'
              label='Quantity in Cart'
              fullWidth
              value={quantity}
              onChange={handleInputChange}/>
          </Grid>
          <Grid item xs={6}>
            <LoadingButton 
              disabled={item?.quantity === quantity || !item && quantity === 0}
              sx={{height: '55px'}}
              loading={submitting}
              onClick={handleUpdateCart}
              variant='contained'
              color='primary'
              size='large'
              fullWidth>
                {item ? 'Update Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
          
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;