import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser(props) {
    const initialState = {
        firstName:"",
        lastName: "",
        email:"",
        password: ""
    }
    const [user, setUser]=useState(initialState);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const getUser = async ()=>{
            try{
                const response = await fetch(`http://localhost:5000/user/${id}`, {method:"GET"});
                if(!response.ok) throw Error('Please reload the app');
                    const userList = await response.json();    
                    setUser(userList);
            }
            catch(err){
              console.log(err.message);
            }
        }
        getUser();
    },[id])
    
    const addUser = async ()=>{

        const postOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }
        try{
            const response = await fetch(`http://localhost:5000/user/${id}`, postOptions);
            if(!response.ok) throw Error('Please reload the app');
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
        event.preventDefault();
    }

    const onSave=(event)=>{
        event.preventDefault();
        addUser();
        navigate("/dashboard/user-list")
    }
    
        return(
            <div className="card shadow p-3">
                        <h4>Edit User</h4>
                        <form className="form">
                            <div className="mb-3">
                                <label className="form-label fw-bold">First Name</label>
                                <input className="form-control" onChange={handleChange} name="firstName" placeholder="First Name" value={user.firstName} />
                            </div>
                            <div className="mb-3">
                            <label className="form-label fw-bold">Last Name</label>
                                <input className="form-control" onChange={handleChange} name="lastName" placeholder="Last Name" value={user.lastName}/>
                            </div>
                            <div className="mb-3">
                            <label className="form-label fw-bold">Email Id</label>
                                <input className="form-control" onChange={handleChange} name="email" placeholder="Email Address" value={user.email}/>
                            </div>
                            <div className="mb-3">
                            <label className="form-label fw-bold">Password</label>
                                <input className="form-control" onChange={handleChange} name="password" placeholder="Password" value={user.password}/>
                            </div>
                            <button className="btn btn-primary" onClick={onSave}>Update</button>
                        </form>
                    </div>
        )
}

export default EditUser;