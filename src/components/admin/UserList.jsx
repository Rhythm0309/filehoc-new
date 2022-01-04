import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserList(props) {
    const [userList, setUserList] = useState([])

    useEffect(()=>{
        const getUser = async ()=>{
            try{
                const response = await fetch("http://localhost:5000/user", {method:"GET"});
                if(!response.ok) throw Error('Please reload the app');
                    const userList = await response.json();    
                    setUserList(userList);
            }
            catch(err){
              console.log(err.message);
            }
        }
        getUser();
    },[userList])

    const onDelete = async(id)=>{
        // eslint-disable-next-line no-restricted-globals
        console.log(id);
            try{
                var response = await fetch(`http://localhost:5000/user/${id}`, {method:"DELETE"});
                console.log(response);
                if(!response.ok) throw Error('Please reload the app');
                var allUsers = [...userList];
                allUsers = allUsers.filter((use)=>{return use.id !== id});                
                setUserList(allUsers);
            }
            catch(err){
              console.log(err.message);
            }
        }

    return (
        
            <table className='table table-dark table-bordered table-hover align-middle mt-4'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className='text-center'>Edit</th>
                        <th className='text-center'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {userList.map((user)=>{
                    return (<tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName + " " + user.lastName}</td>
                    <td>{user.email}</td>
                    <td className='text-center'><Link className='btn btn-warning' to={`/dashboard/edit-user/${user.id}`}><i className='bi bi-pencil-square'></i></Link></td>
                    <td className='text-center'><button type='button' className='btn btn-danger' onClick={()=>{onDelete(user.id)}}><i className='bi bi-x-lg'></i></button></td>
                    </tr>
                    )
                })}                
                </tbody>
            </table>
    );
}

export default UserList;