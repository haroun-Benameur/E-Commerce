import React, { useEffect,useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card ,Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/ProductAction';
import Loader from '../components/Loader' 
import Message from '../components/Message'
const ProductScreen = () => {
    const navigate=useNavigate()
   const [qty, setQty] = useState(1);//we dont need redux because its small part of our  state
   
    const {id}=useParams();
     const dispatch=useDispatch();
     const productDetail=useSelector( state => state.productDetails )
     const {loading , error , product} = productDetail;
   // const product = products.find(p => p._id === id);
    
    useEffect(()=> {
      
          
        dispatch(listProductDetails(id)); 
    
  
    },[dispatch,id])
 
    
   const addToCartHandler=()=>{
    console.log('Add to cart'+id);
    navigate(`/cart/${id}?qty=${qty}`);
   }
   
    return (
        <>

        {loading ? (
            <Loader/>
        ):error?  
          (<Message variant='danger'>{error}</Message>) :  
        (  product ?  <div>
            <Link to='/' className='btn tbn-light my-3' > go back</Link>
            <Row>
             <Col md={6} >
                 <Image src={product.image} alt={product.image} fluid />
             </Col>

             <Col md={3} >
                <ListGroup variant='flush'>
                     <ListGroup.Item>
                         <h3> {product.name} </h3>
                     </ListGroup.Item>

                      <ListGroup.Item>
                       <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"} />
                      </ListGroup.Item>

                      <ListGroup.Item>
                        price: {product.price}$ 
                     </ListGroup.Item>

                     <ListGroup.Item>
                         <h3>{product.description}</h3>
                     </ListGroup.Item>

                </ListGroup>
             </Col>

             <Col md={3} >
                 <Card>
                     <ListGroup variant='flush'>
                         <ListGroup.Item>
                             <Row>
                                 <Col> price: </Col> 
                                 <Col>
                                 <strong> {product.price} </strong>
                                 
                                 </Col>
                             </Row>
                         </ListGroup.Item>

                         <ListGroup.Item>
                             <Row>
                                 <Col> status: </Col> 
                                 <Col>
                                 {product.countInStock>0 ?'in stock':'out of stock'}
                                 
                                 </Col>
                             </Row>


                         </ListGroup.Item>

                         {product.countInStock > 0 && (
                            <ListGroup.Item >
                                <Row>
                                    <Col>Qty</Col>
                                    <Col xs='auto' className='my-1' >
                                    <Form.Control as="select" value={qty} onChange={(e)=> setQty(e.target.value)} >

                                        { [...Array(product.countInStock).keys()].map( (x)=>(
                                            <option key={x+1} value={x+1} >
                                                {x+1}
                                            </option>
                                        ) )   } 

                                    </Form.Control>
                                        
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                         )}

                         <ListGroup.Item>
                                            
                             <Button
                             onClick={addToCartHandler} className='btn-block' disabled={product.countInStock===0} type='button' style={{width:'100%'}} >add to cart</Button>
                         </ListGroup.Item>

                     </ListGroup>
                 </Card>
             </Col>
            </Row>
         </div>
      :  <h2>project not founded</h2>) }
                
           
               
            
        </>
    );
};

export default ProductScreen;
