import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../UserContext';

function Signin(props) {
    const [user, setUser]=useState([]);
    const currentContext = useContext(userContext);
    console.log(currentContext);

    const [loginMessage, setLoginMessage] = useState("");
    let navigate = useNavigate();

    

    const handleChange=(event)=>{
        
        const { name, value } = event.target;
        setUser((userList) => ({
            ...userList,
            [name]: value
        }));
    }

        const getUser = async ()=>{
            try{
                const response = await fetch(`http://localhost:5000/user?email=${user.email}&password=${user.password}`,
                { method: "GET" });
                if(response.ok){
                    let responseBody = await response.json();
                    console.log(responseBody)
                    if (responseBody.length > 0) {
                        currentContext.setUserState({
                            ...currentContext.userState,
                            isLoggedIn: true,
                            currentUserId: responseBody[0].id,
                            currentUserName: responseBody[0].firstName
                        })
                        
                        navigate("/"); 
                    } else {
                      setLoginMessage(
                        <span className="text-danger">Invalid Login, please try again</span>
                      );
                    }
                  } else {                    
                    setLoginMessage(
                      <span className="text-danger">Unable to connect to server</span>
                    );
                    throw Error('Please reload the app');
                  }
            }
            catch(err){
              console.log(err.message);
            }
        }


    const onLogin=(event)=>{
        event.preventDefault();
        getUser();
    }

    return (
        <>
        <form>
        <h4 className='fs-4 fw-light mb-3'>Sign In</h4>
                <div className='mb-3'>
                    <label htmlFor='user-email'>Email Id</label>
                    <input type="text" className='form-control' onChange={handleChange} name='email' id='user-email' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='user-pass'>Password</label>
                    <input type="password" className='form-control' onChange={handleChange} name='password' id='user-pass'/>
                </div>
                <div className="m-1">{loginMessage}</div>
                <button className='btn w-100 btn-primary' onClick={onLogin}>Login</button>
        </form>
        <div className='mt-3'>
            Not a user yet? <Link to="/signup">Sign Up</Link>
        </div>
        </>
    )
}

export default Signin;