import React, { useState } from 'react';
import '../styles/Login.css'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { useStateValue } from "./StateProvider";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [{}, dispatch] = useStateValue();
    const signIn = async(e) => {
        e.preventDefault();
        const obj = { email: email, password: password };
        const data= await axios.post('http://localhost:5000/api/signin', obj).then(res =>{
            console.log('res',res)
            dispatch({
                type: "SET_USER",
                user: res.data,
              });
            history.push('/')
        })
        .catch(error => alert("Account or Password is wrong"))
    }

    const register = async(e) => {
        e.preventDefault();
        const obj = { email: email, password: password };
        const data = await axios.post('http://localhost:5000/api/register', obj).then(res =>{
            history.push('/')
        }).catch(error => alert(error.message))
    }
    // const signIn = ()=>{
    //     axios.post('/api/auth/sign-in',{
    //     email:email,
    //     password:password
    //   }).then((resp)=>{
    //     console.log(resp.data);
    //     localStorage.setItem('jwt',resp.data);
    //     //userlogin(resp.data)
    //     history.push("/home")
    //     //todo go to home page
    //   }).catch(r=>{
    //     console.log(r);
    //     alert("Bad credentials");
    //   });
    // }

    // const register = e => {
    //     e.preventDefault();

    //     auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then((auth) => {
    //             // it successfully created a new user with email and password
    //             if (auth) {
    //                 history.push('/')
    //             }
    //         })
    //         .catch(error => alert(error.message))
    // }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='./assets/logo.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the Anita shop Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton'>Create your Account</button>
            </div>
        </div>
    )
}

export default Login
