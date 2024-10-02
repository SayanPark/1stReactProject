import React, {useState, useEffect, useContext} from "react";
import './SignIn.css';
import LogoImg from "../../../assets/images/reactapp-logo.png";
import Button from "../../UI/Button/button";
import reloadimage from '../../../assets/images/icons8-refresh-50.png';
import  {AuthContext} from '../../../context/Auth/authContext';

const SignIn =(props)=>{

    const[randomNo1, setRandomNo1] = useState(0)
    const[randomNo2, setRandomNo2] = useState(0);
    const[sumHolder, setSumHolder] = useState(0);
    const[captchaV, setcaptchaV] = useState(0);
    const[errorMessage,setErrorMessage] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('')
    const{dispatch} = useContext(AuthContext);

    useEffect(()=>{
        generateCaptcha();
    },[])

    const generateCaptcha=()=>{
        let number1 = Math.floor(Math.random()*10)+1;
        let number2 = Math.floor(Math.random()*10)+1;
        setRandomNo1(number1);
        setRandomNo2(number2);
        let sum = number1+ number2;
        setSumHolder(sum);
    }
    const captchaHandler=(event)=>{
        setcaptchaV(Number(event.target.value));
    }
    const validate=()=>{
        if(username===''){
            setErrorMessage('یوزرنیم نباید خالی باشد.');
            return false;
        }
        else if(!username.includes('@') || !username.includes('.')){
            setErrorMessage('.یوزرنیم معتبر نمی باشد');
            return false;
        }
        else if(password ===''){
            setErrorMessage('پسوورد نباید خالی باشد.');
            return false;
        }
        else if(password.length<5){
            setErrorMessage('.پسوورد کمتر از 5 حرف می باشد');
            return false;
        }
        setErrorMessage('');
        return true;
    }
    const loginHandler=()=>{
        if(sumHolder===captchaV){
            setErrorMessage('');
            const validateResult =  validate();
            if(validateResult){
                fetch('http://localhost:8080/student/user_login.php',{
                    method:'POST',
                    headers:{
                        'Accept' : 'applicaion/json',
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        email:username,
                        password:password
                    })
                }).then((response)=>response.json())
                    .then((responseJson)=>{
                        if(responseJson==="Data Matched"){
                            dispatch({type:'login',payload:username});
                        }
                        else{
                            setErrorMessage(responseJson)
                        }
                    }).catch((error)=>{
                        alert(error)
                    })
            }
        }
        else{
            setErrorMessage('captcha Invalid');
            return false;
        }
    }
    const usernameHandler=(event)=>{
        setUsername(event.target.value)
    }
    const passwordHandler=(event)=>{
        setPassword(event.target.value)
    }

    return(
    <React.Fragment>
        <p style={{color:'red',fontSize:'56'}}>{errorMessage}</p>
        <img src={LogoImg} alt="reactapp.ir"/>
        <input type="text" placeholder="username" value={username} onChange={usernameHandler}/>
        <input type="password" placeholder="password" value={password} onChange={passwordHandler}/>
        <div className="captcha_view">
            <img src={reloadimage} alt="refresh" onClick={generateCaptcha}/>
            <input type="text" onChange={captchaHandler}/>
            <p>{randomNo1} + {randomNo2} =</p>
        </div>
        <Button clicked={loginHandler}>ورود</Button>
    </React.Fragment>
    )
}

export default SignIn;