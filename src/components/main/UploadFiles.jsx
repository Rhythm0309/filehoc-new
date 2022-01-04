import React from 'react';
import {useState} from "react";

function UploadFiles(props) {
    let localData=JSON.parse(localStorage.getItem("userState"));
    const [selectedFile,setSelectedFile]=useState({});
    const [isFileSelected,setIsFileSelected]=useState(false);
    const[message,setMessage]=useState("")

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const addFiles = async ()=>{

        const postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedFile)
        }
        try{
            const response = await fetch(`http://localhost:5000/files`, postOptions);
            if(!response.ok) throw Error('Please reload the app');
        }
        catch(err){
          console.log(err.message);
        }
    } 
    const uploadFile=(event)=>{
        event.preventDefault();
        if(isFileSelected){
        addFiles();
        }
        else{
            setMessage(<div className='alert-danger p-3 mt-2'>Upload the File</div>);
        }
        // navigate("/dashboard/user-list")
    }

    const handleChange = async(event) => {

        const files=event.target.files[0];
        const baseString=await convertBase64(files);
        setSelectedFile({
            ...selectedFile,
            fileName:files.name,
            fileExt:files.type,
            fileSize:files.size,
            fileSTring:baseString,
            userId:localData.currentUserId

        })
        console.log(files);
        console.log(baseString)

    }


    return (
        <>

            <form>
                <div className="card form-group des">
                    <div className="input-group mb-2 p-3">
                        <label><i className="fas fa-cloud-upload-alt"></i></label>
                        <input className="text-center no-border" type="file" onChange={handleChange} />
                    </div>
                    <br />

                    <input className="form-control" type="email" placeholder="Add new recipient"></input>

                    <br />
                    <input className="form-control" type="email" placeholder="Your email"></input>

                    <br />
                    <textarea type="text-area" className="form-control" placeholder="Message"></textarea>

                    <button type="submit"  onClick={uploadFile} className="btn btn-primary  col-6 mx-auto p-2 m" >Send</button>

                </div>

            </form>

        </>
    );
}

export default UploadFiles;