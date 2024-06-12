import React,{useState,useEffect} from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'

import { Row,Col,Form,Button, FormGroup} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile, getUserDetails } from '../actions/UserAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = () => {

    const location=useLocation()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading , error , user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin

    const userUpdateProfil = useSelector((state) => state.userUpdateProfil)
    const {  success } = userUpdateProfil

    
    useEffect( ()=> {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name  || success)  {
                dispatch( {type:USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))// profile=id
            } else {
                setName(user.name)
                setEmail(user.email)

            }
        }
    } ,[navigate,userInfo,dispatch,user,success])
    
     const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }


  return (
    <Row>
        <Col md={3} >
            <h2>User Profile</h2>

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
            
            placeholder="Enter your password"
            value={password} 
            onChange={ (e)=> setPassword(e.target.value) }>
                
            </Form.Control>
        </Form.Group>

        <Form.Group controlId= ' confirm password'>
            <Form.Label> confirm passwrod </Form.Label> 
            <Form.Control type="passwrod"
            
            placeholder="confirm password"
            value={confirmPassword} 
            onChange={ (e)=> setConfirmPassword(e.target.value) }>
                
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>UPDATE</Button>

      </Form>
        </Col>

        <Col md={9} >
            <h2>my orders</h2>
        </Col>


    </Row>
  )
}

export default ProfileScreen
