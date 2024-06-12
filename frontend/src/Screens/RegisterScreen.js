import React,{useState,useEffect} from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'

import { Row,Col,Form,Button, FormGroup} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import { register } from '../actions/UserAction'


const RegisterScreen = () => {
    const location=useLocation()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
    
    const redirect=location.search?location.search.split('=')[1]:'/'//location.serach => ?.....
    const userRegister = useSelector((state) => state.userRegister)

    const { loading , error , userInfo } = userRegister
    
    useEffect( ()=> {
        if (userInfo) {
            navigate(redirect)
        }
    } ,[navigate,redirect,userInfo])
    
    const submitHandler =(e) => {
        e.preventDefault()
        if (password!=confirmPassword){
            setMessage("Passwords do not match")
        }
             else {
            
                dispatch(register(name,email, password))

             }
    }
  return (
    <FormContainer>
        <h1>Sign in </h1> 
        {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler} >

      <Form.Group controlId='name'>
            <Form.Label>name</Form.Label> 
            <Form.Control type="name"
            required
            placeholder="Enter name"
            value={name} 
            onChange={ (e)=> setName(e.target.value) }>

            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label> Email address </Form.Label> 
            <Form.Control type="email"
            required
            placeholder="Enter email"
            value={email} 
            onChange={ (e)=> setEmail(e.target.value) }>

            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label> passwrod </Form.Label> 
            <Form.Control type="passwrod"
            required
            placeholder="Enter your password"
            value={password} 
            onChange={ (e)=> setPassword(e.target.value) }>
                
            </Form.Control>
        </Form.Group>

        <Form.Group controlId= ' confirm password'>
            <Form.Label> confirm passwrod </Form.Label> 
            <Form.Control type="passwrod"
            required
            placeholder="confirm password"
            value={confirmPassword} 
            onChange={ (e)=> setConfirmPassword(e.target.value) }>
                
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>REGISTER</Button>

      </Form>

      <Row className='py-y' >
        
        <Col>
           have an account?<Link to={redirect?`/register?redirect=${redirect}`:'/login'}>sign in </Link>
        </Col>
        
        </Row>
    </FormContainer>
)}

export default RegisterScreen
