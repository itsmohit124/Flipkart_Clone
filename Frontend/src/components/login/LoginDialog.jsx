import { useState, useContext } from 'react';
import { Dialog, TextField, Box, Button, Typography, styled } from '@mui/material';

import { authenticateSignup , authenticateLogin } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    height: 70vh;
    width: 90vh;
`
const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85%  no-repeat;
    height: 83%;
    width: 28%;
    padding: 40px 33px;
    & > p,& > h5{
        color: #FFFFFF;
        font-weight: 600;
    }
`
const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    flex: 1;
    & > div ,& > button ,& > p{
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #fd641B;
    color: #fff;
    height: 48px;
    border-radius:2px;
`
const RequestOTP= styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius:2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`
const Text= styled(Typography)`
    font-size:12px;
    color: #878787;
`
const CreateAccount =styled(Typography)`
    font-size: 14px;
    text-align: center;
    color: #2874f0;
    font-weight: bold;
    cursor: pointer; 
`
const ErrorMessage = styled(Typography)`
    font-size: 14px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const accountInitialValues ={
    login: {
        view : 'login',
        heading: "Login",
        subheading: "Get access to your Orders, Wishlist and Recommendations"
    },
    signup: {
        view : 'signup',
        heading: "Looks like you're new here!",
        subheading: "Sign up with your mobile number to get started"

    }
}

const signupInitialValues = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}
const loginInitialValues = {
    phone: '',
    password: ''
}

const LoginDialog = ({open, setOpen }) =>{
    
    const [account,toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const {setAccount} = useContext(DataContext);
    const [login, setLogin] = useState(loginInitialValues);

    const [error, setError] = useState(false);

    const handleClose =()=>{
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
    }

    const toggleSignup =() =>{
        toggleAccount(accountInitialValues.signup);
    }

    const onInputChange = (e) => {
        setSignup({...signup,[e.target.name]: e.target.value});
    }

    const onValueChange = (e) =>{
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const loginUser = async() => {
        let response= await authenticateLogin(login);
        console.log(response);
        if(response.status === 200){
            handleClose();
            setAccount(response.data.data.username);
            
        }
        else{
            setError(true);
        }
    }

    const signupUser =async() =>{
        let response = await authenticateSignup(signup);
        if (!response) return;
        handleClose();
        setAccount(signup.username);
    }

    return(
        <Dialog open={open} onClose={handleClose} PaperProps={{sx: {maxWidth: 'unset'}}}>
            <Component>
                <Box style={{display:'flex', height: '100%'}}>
                <Image>
                    <Typography variant='h5'>{account.heading}</Typography>
                    <Typography style={{marginTop: 20}}>{account.subheading}</Typography>
                </Image>{
                    account.view ==='login' ?
                    <Wrapper>
                        <TextField variant='standard' onChange={(e) => onValueChange(e)} name='phone' label='Enter Email/Mobile number'/>
                        
                       {error &&<ErrorMessage>Please enter valid username or password</ErrorMessage>}
                        
                        <TextField variant='standard' onChange={(e) => onValueChange(e)} name='password' label='Enter Password'/>
                        <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                        <LoginButton onClick={() => loginUser()}>Login</LoginButton>
                        <Typography style={{textAlign:"center"}}>OR</Typography>
                        <RequestOTP>Request OTP</RequestOTP>
                        <CreateAccount onClick={() => toggleSignup()}>New to Flipkart? Create an account</CreateAccount>
                    </Wrapper>
                    :
                    <Wrapper>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='fullname' label='Enter Full Name'/>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='username' label='Enter Username'/>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='email' label='Enter Email'/>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label='Enter Password'/>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone'/>
                        <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
                    </Wrapper>
                }
                </Box>
            </Component>
           
        </Dialog>
    );
}

export default LoginDialog;