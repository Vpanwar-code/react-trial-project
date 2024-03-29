import React, { useEffect, useState ,useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  
  const emailReducer= (state,action) =>{
    if(action.type === 'USER_INPUT'){
      return {value : action.val , isValid : action.val.includes('@')};
    }
    if(action.type === 'INPUT_BLUR'){
      return {value : state.value , isValid : state.value.includes('@')};
    }
    return {value :'' , isValid : false};
  }

  const passReducer = (state,action) =>{
    if(action.type === 'PASS_INPUT'){
      return {value : action.passVal , isValid : action.passVal.trim().length > 6}
    }
    if(action.type === 'PASS_BLUR'){
      return {value : state.value , isValid : state.value.trim().length > 6}
    }
    return {value : '' , isValid : false};

  }
  

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail]= useReducer(emailReducer ,{
    value : '',
    isValid : false,
  });

  const [passState, dispatchPass]= useReducer(passReducer ,{
    value : '',
    isValid : false,
  });

  useEffect(()=>{
     console.log('Effect running');

     return ()=>{
        console.log('Effect Cleanup');  
     };
  },[])

  // useEffect(()=>{
  //   const identifier = setTimeout(()=>{
  //     console.log('Checking form validity')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  
  //   },500);
  //   return  ()=>{
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
   
  // },[enteredEmail,enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT' , val : event.target.value});
    
    setFormIsValid(
      emailState.isValid  && passState.isValid
    );
    
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type: 'PASS_INPUT' , passVal : event.target.value});

    setFormIsValid(
      emailState.isValid && passState.isValid
    );

  };

  const validateEmailHandler = () => {
    dispatchEmail({type : 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPass({type : 'PASS_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
