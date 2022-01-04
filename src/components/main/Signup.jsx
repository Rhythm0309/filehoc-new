import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../UserContext';

function Signup(props) {
    
    const [user, setUser]= useState([]);    
    const currentContext = useContext(userContext);
    const navigate = useNavigate();
    const inputField = useRef(null);
    const [errors, setErrors] = useState({
        email:[],
        firstName: [],
        lastName: [],
        password: []
    })

    const [dirty, setDirty] = useState({
        email:false,
        firstName: false,
        lastName: false,
        password: false
    });
    
    const [message, setMessage] = useState("");
    

    const validate = ()=>{
        let errorsData = {};
        //email
        errorsData.email = [];
        //if email is blank
        if(!user.email){
            errorsData.email.push("Please provide email");
        }

        let emailreg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

        if(user.email){
            if(!emailreg.test(user.email)){
                errorsData.email.push("Please enter valid email")
            }
        }

        //password

        errorsData.password = [];
        //if email is blank
        if(!user.password){
            errorsData.password.push("Please provide password");
        }

        // let passreg = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;

        // if(user.password){
        //     if(!passreg.test(user.password)){
        //         errorsData.password.push("Password should be minimu 8 characters with atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character");
        //     }            
        // }

        //first name

        errorsData.firstName = [];
        //if email is blank
        if(!user.firstName){
            errorsData.firstName.push("Please provide first name");
        }

        //last name

        errorsData.lastName = [];
        //if email is blank
        if(!user.lastName){
            errorsData.lastName.push("Please provide last name");
        }       

        setErrors(errorsData);
    }

    useEffect(validate,[user]);


    let isValid = ()=>{
        let valid = true;
        for(let control in errors){
            if(errors[control].length>0){
                valid = false;
            }
        }
       return valid; 
    }


    const addUser = async ()=>{
        const postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }
        try{
                const loginResponse = await fetch(`http://localhost:5000/user?email=${user.email}`,
                { method: "GET" });
                let responseBody = await loginResponse.json();
                if(responseBody.length>0){
                    setMessage(<span>User already exists</span>)
                }
                else{
                    const response = await fetch("http://localhost:5000/user/", postOptions);
                    if(response.ok){                       
                        const latestResponse = await fetch(`http://localhost:5000/user`,{method:"GET"});
                        let responseBody = await latestResponse.json();
                        let res = responseBody[responseBody.length -1];
                        currentContext.setUserState({
                            ...currentContext.userState,
                            isLoggedIn: true,
                            currentUserId: res.id,
                            currentUserName: res.firstName 
                        })
                        navigate("/");
                    }else{
                        throw Error('Please reload the app');
                    } 
                    
                }
        }
        catch(err){
          console.log(err.message);
        }
    } 

    const handleChange=(event)=>{
        
        const { name, value } = event.target;
        setUser((userList) => ({
            ...userList,
            [name]: value
        }));
    }

    const onblurHandle=(event)=>{
        const {name} = event.target;
        setDirty((dirty)=>({
            ...dirty,
            [name]: true
        }))
        validate();
    }


    const onSave=(event)=>{
        event.preventDefault();
        

        if(isValid()){
            addUser();            
        }
        else{
            const currValue = inputField.current.value;
            if(!currValue){
            Object.keys(dirty).forEach((abc) => dirty[abc] = true)
        }
            setMessage(<div className="text-danger">Please resolve errors in the form</div>)
        }       
    }
    
        return(
            <>
                        <h4 className='fs-4 fw-light mb-3'>Sign Up</h4>
                        <form className="form">
                            
                            <div className="mb-3">
                                <input type="text" ref={inputField} className="form-control" onChange={handleChange} onBlur={onblurHandle} name="firstName" placeholder="First Name" />
                                <div className="text-danger">{dirty["firstName"]&&errors["firstName"][0]?errors["firstName"]:""}</div>
                            </div>

                            <div className="mb-3">
                                <input type="text" ref={inputField} className="form-control" onChange={handleChange} onBlur={onblurHandle} name="lastName" placeholder="Last Name" />
                                <div className="text-danger">{dirty["lastName"]&&errors["lastName"][0]?errors["lastName"]:""}</div>
                            </div>
                            <div className="mb-3">
                                <input type="text" ref={inputField} className="form-control" onChange={handleChange} onBlur={onblurHandle} name="email" placeholder="Email Address" />
                                <div className="text-danger">{dirty["email"]&&errors["email"][0]?errors["email"]:""}</div>
                            </div>
                            <div className="mb-3">
                                <input type="password" ref={inputField} className="form-control" onChange={handleChange} onBlur={onblurHandle} name="password" placeholder="Password" />
                                <div className="text-danger">{dirty["password"]&&errors["password"][0]?errors["password"]:""}</div>
                            </div>
                            {message}
                            <button className="btn w-100 btn-primary" onClick={onSave}>Sign Up</button>
                        </form>
                        <div className='mt-3'>
            Already a user? <Link to="/signin">Sign In</Link>
        </div>
                    </>
        )
}

export default Signup;