import React,{useState,useEffect} from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'

import { Row,Col,Form,Button, FormGroup} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import { login } from '../actions/UserAction'

const LoginScreen = () => {
    const location=useLocation()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const redirect=location.search?location.search.split('=')[1]:'/'//location.serach => ?.....
    const userLogin = useSelector((state) => state.userLogin)

    const { loading , error , userInfo } = userLogin
    
    useEffect( ()=> {
        if (userInfo) {
            navigate(redirect)
        }
    } ,[navigate,redirect,userInfo])
    
    const submitHandler =(e) => {
        e.preventDefault()
       dispatch(login(email, password))
    }
    return (

    <FormContainer>
      <h1>Sign in </h1> 
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler} >

        <Form.Group controlId='email'>
            <Form.Label> Email address </Form.Label> 
            <Form.Control type="email"
            placeholder="Enter email"
            value={email} 
            onChange={ (e)=> setEmail(e.target.value) }>

            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label> passwrod </Form.Label> 
            <Form.Control type="passwrod"
            placeholder="Enter your password"
            value={password} 
            onChange={ (e)=> setPassword(e.target.value) }>
                
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Sign IN</Button>

      </Form>

        <Row className='py-y' >
        
        <Col>
            New Customer?<Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
        </Col>
        
        </Row>
    </FormContainer>
  )
}

export default LoginScreen
