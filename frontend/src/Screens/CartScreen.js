import React ,{useEffect}from 'react'
import { Link, useLocation, useNavigate,useParams } from 'react-router-dom' 
import { useDispatch,useSelector } from 'react-redux' 
import { Row,Col,ListGroup,Image,Button,Card,Form } from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart ,removeFromCart} from '../actions/cartActions'
const CartScreen = ({}) => {
  const {id}=useParams();
  
  const Location=useLocation()
  
  const dispatch = useDispatch();
  
  const navigate=useNavigate(); 
  
  const qty=Location.search?Number(Location.search.split("=")[1]) :1  // ?qty=2    
  
  const cart =useSelector(state=>state.cart)
  
  const {cartItems}=cart 
  
  
  useEffect(()=> {
    if(id) {
      dispatch(addToCart(id,qty))
    }
  },[dispatch,id,qty])
  
const removeFromCartHandler =(id) => {
    dispatch(removeFromCart(id));
}

const checkoutHandler=()=> {
  navigate('/login?redirect=/shipping')
}
  return (
    <Row>
      <Col md={8} >
        <h1>Shopping cart</h1> 
        {cartItems.length===0 ?(
          <Message>
            your cart is empty <Link to='/'>Go back</Link>
          </Message>
        ):  (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key = {item.product}>
                <Row>
                  <Col md={2}  sm={10}  ><Image src={item.image} alt={item.name} fluid rounded /> </Col>
                  <Col md={3}  sm={10}>
                    <Link to={`/product/${item.product}`} >{item.name}</Link>
                  </Col>

                  <Col md={2} > $ {item.price} </Col>

                  <Col md={2}>   
                    <Form.Control as="select" value={item.qty} onChange={(e)=> dispatch(addToCart(item.product,Number(e.target.value)))} >

                    { [...Array(item.countInStock).keys()].map( (x)=>(
                        <option key={x+1} value={x+1} >
                            {x+1}
                        </option>
                    ) )   } 

                      </Form.Control>
                      </Col>
                      <Col md={1}>
                        <Button 
                        type='button'
                         variant='light'
                         onClick={()=> removeFromCartHandler(item.product)}
                         >
                          <i className='fas fa-trash' ></i>
                        </Button>
                      </Col>
                     </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) }
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'> 
              <ListGroup.Item>
                    <h2>Subtottal( {cartItems.reduce( (acc,item)=>  (acc)+(item.qty),0  )}  ) items </h2>   
                    ${cartItems.reduce( (acc,item)=>  acc +item.qty*item.price ,0  ).toFixed(2)}
              </ListGroup.Item>
          

          <ListGroup.Item>
             <Button style={{width:'100%'}}
                type='button'
                className='btn-black'
                disabled={cartItems.length===0}
                onClick={checkoutHandler}
             >
              proced to chekcout
              </Button>    
          </ListGroup.Item>
         
          </ListGroup>
        </Card>
      </Col>
     
    </Row>
  )
}

export default CartScreen
