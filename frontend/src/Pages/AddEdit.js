import React, { useEffect, useState } from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";
import "./AddEdit.css";

const initialState = {
    name:"",
    email:"",
    phone:""
};

export default function AddEdit(){
    const [state,setState]= useState(initialState);
    const {name,email,phone}=state;
    const history= useNavigate();
    const {id}=useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/get/users/${id}`)
        .then((res)=>{
            setState({...res.data[0]});
        })
    },[id]);

    const handleSubmit= (e)=>{
        e.preventDefault();
        if(!name || !email || !phone){
            toast.error("Please provide value into each input field"); 
        }
        else{
            if(!id){
                axios.post("http://localhost:5000/post/users",{name,email,phone})
                .then(()=>{
                    setState({name:"",email:"",phone:""})
                })
                .catch((err)=>{
                    toast.error(err.response.data);
                })
                toast.success("User added successfully!");
            }
            else{
                axios.put(`http://localhost:5000/put/users/${id}`,{name,email,phone})
                .then(()=>{
                    setState({name:"",email:"",phone:""})
                })
                .catch((err)=>{
                    toast.error(err.response.data);
                })
                toast.success("User Updated successfully!");
            }
            
            setTimeout(()=>{
                history("/")
            },500)
        }
    }
    const handleInputChange = (e)=>{
        const {name,value}=e.target;
        setState({...state,[name]:value})
    }
  return (
    <div style={{marginTop:"100px"}}>
        <form action="" style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"
        }}
        onSubmit={handleSubmit}
        >
            <label htmlFor="name">Name</label>
            <input type="text" id='name' name='name' placeholder='Your Name.....' value={name || ""} onChange={handleInputChange} required/>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' placeholder='Your Email.....' value={email || ""} onChange={handleInputChange} required/>
            <label htmlFor="contact">Contact</label>
            <input pattern='\d{10}' type="number" id='phone' name='phone' placeholder='Your Phone No......' value={phone || ""} onChange={handleInputChange} required/>
            <input type="submit" value={id?"Update":"Save"}/>
            <Link to="/">
                <input type="button" value="Go Back" />
            </Link>
        </form>
    </div>
  )
}
