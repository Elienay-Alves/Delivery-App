import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import Header from '../components/header';

export default function CustomerProducts() {
  const [orders, setOrders] = useState([]);
  const [totalValue, setTotalValue] = useState('0,00');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfos = JSON.parse(localStorage.getItem('user'));

    const fetchProducts = async () => {
      const fetchItems = await axios
        .get('http://localhost:3001/customer/products', {
          headers: { Authorization: userInfos.token },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setProducts(fetchItems);
    };
    fetchProducts();
  }, []);

  useEffect(() => {}, [totalValue]);

  const addProduct = (i, qnt) => {
    const findItem = orders.findIndex((item) => item.id === i);
    const number = -1;
    console.log(findItem);
    if (findItem !== number) {
      orders[findItem].qnt = qnt;
      setOrders(orders);
    } else {
      const newProduct = products[i - 1];
      newProduct.qnt = qnt;
      orders.push(newProduct);
      setOrders(orders);
    }
    localStorage.setItem('carrinho', JSON.stringify(orders));
    const value = orders.reduce((acc, cur) => acc + Number(cur.price) * cur.qnt, 0);
    setTotalValue(value.toFixed(2).replace('.', ','));
  };

  return (
    <div>
      <Header />
      {products?.map((product, index) => (
        <ProductCard key={ index } data={ product } addProduct={ addProduct } />
      ))}
      <button
        type="submit"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ totalValue === '0,00' }
      >
        <div>
          Ver Carrinho: R$
          <span data-testid="customer_products__checkout-bottom-value">
            {totalValue}
          </span>
        </div>
      </button>
    </div>
  );
}
