import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import "./Home.css";

const Home = ()=>{
    const [data,setData]= useState([]);
    const loadData = async ()=>{
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    }
    useEffect(()=>{
        loadData();
    },[])

    function deleteContact(id){
        if(window.confirm("Are you sure that you wanted to delete that contact?")){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("contact deleted successfully!");
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <div style={{marginTop:"150px"}}>
            <Link to="/addContact">
                <button className="btn btn-contact">Add Contact</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign:"center"}}>ID</th>
                        <th style={{textAlign:"center"}}>Name</th>
                        <th style={{textAlign:"center"}}>Email</th>
                        <th style={{textAlign:"center"}}>Contact</th>
                        <th style={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>
                    <tbody>
                        {data.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contact}</td>
                                    <td>
                                        <Link to={`/update/${item.id}`}>
                                            <button className="btn btn-edit">Edit</button>
                                        </Link>
                                        <button className="btn btn-delete" onClick={()=>deleteContact(item.id)}>Delete</button>
                                        <Link to={`/view/${item.id}`}>
                                            <button className="btn btn-view">View</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
        </div>
    )
}

export default Home;