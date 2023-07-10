import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import "./Home.css";

const Home = ()=>{
    const [data,setData]= useState([]);
    
    const loadData = async ()=>{
        const response = await axios.get("http://localhost:5000/get/users");
        setData(response.data);
    }
    useEffect(()=>{
        loadData();
    },[])

    function deleteContact(id){
        if(window.confirm("Are you sure that you wanted to delete that user?")){
            axios.delete(`http://localhost:5000/delete/users/${id}`);
            toast.success("User deleted successfully!");
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <div style={{marginTop:"150px"}}>
            <Link to="/addUser">
                <button className="btn btn-contact">Add User</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign:"center"}}>ID</th>
                        <th style={{textAlign:"center"}}>Name</th>
                        <th style={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>
                    <tbody>
                        {data.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td scope="row">{item.id}</td>
                                    <td>{item.name}</td>
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