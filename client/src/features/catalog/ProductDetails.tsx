import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../app/models/product';
import agent from '../../app/api/agent';
import NotFound from '../../app/errors/NotFound';
import Loading from '../../app/layout/Loading';

const ProductDetails = () => {

  const {id} = useParams<{id: string}>(); //everything from url is a string
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch if we only have id
    id && agent.Catalog.details(parseInt(id))
      .then(resp => setProduct(resp))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id])

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
      </Grid>
    </Grid>
  );
};

export default ProductDetails;