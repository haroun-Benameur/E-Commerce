import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/ProductAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, loading, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
        console.log("render")
    },[dispatch]); // Since listProducts is an async action, it's okay to keep dispatch here

    return (
        <div>
            <h1>Latest products</h1>
            
            {loading ? (
                <Loader/>
            ) : error ? (
               <Message variant='danger' >{error}</Message>
            ) : products ? (
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <h3>No products found</h3>
            )}
        </div>
    );
};

export default HomeScreen;
