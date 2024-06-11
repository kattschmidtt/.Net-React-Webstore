import agent from '../../app/api/agent';
import Loading from '../../app/layout/Loading';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';
import { useEffect, useState } from 'react';


const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    /* fetch('http://localhost:5027/api/Products')
    .then(response => response.json())
    .then(data => setProducts(data)) */
    //custom created agent to shorten and localize our axios requests
    agent.Catalog.list()
    .then(products => setProducts(products))
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
  }, []);

  if (loading) return <Loading message='Loading products...'/>

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;