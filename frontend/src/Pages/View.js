import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./View.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;


const View = () => {
    const [user,setUser]=useState({});
    const {id}=useParams();
    
    useEffect(()=>{
        axios.get(`${BASE_URL}/get/users/${id}`)
        .then((res)=>{
            setUser({...res.data[0]});
        })
    },[id]);

    return (
        <div style={{marginTop:"150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Details</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Name:</strong>
                    <span>{user.name}</span>
                    <br />
                    <br />
                    <strong>Email:</strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>Phone:</strong>
                    <span>{user.phone}</span>
                    <br />
                    <br />
                    <Link to="/">
                        <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View;