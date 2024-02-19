"use client"
import React, { useState } from 'react'
import { FaAddressBook } from "react-icons/fa";
import { HiArrowCircleLeft } from "react-icons/hi";
import { HiPrinter } from "react-icons/hi";
import { RiSave2Line } from "react-icons/ri";
import axios from 'axios';
import './Teacher.css'
import { useRouter } from 'next/navigation';

const Teacher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();
  
  const handleBack = () => {
      router.back();
    };

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8081/arci/teachers', {searchTerm});
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost:8081/arci', { id });
      handleSearch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      await axios.post('http://localhost:8081/arci', { id, updatedData });
      handleSearch();
    } catch (error) {
      console.log(error);
    }
  };

  const Change = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }
   console.log(searchTerm);
  return (
    <div className='s-wrapper'>
    <div className="container">
      <div className="h-container">
      <FaAddressBook size="30px"/>
      <strong><h1>Teacher</h1></strong>
      </div>
      <div className="sections1">

        <div className="save">
          <button className='btn1'><HiArrowCircleLeft size='20px' onClick={handleBack}/>Go Back</button>
          <button className='btn'><RiSave2Line size='20px'/>Save</button>
          <button className='btn1'><HiPrinter size='20px'/>Print</button>
        </div>

        <div className="search1">
          <form action="">
          <h2>Teacher's Name:</h2>
          <input type="text" onChange={Change} name='name'/>
           <button className='btn3' onSubmit={handleSearch}>Submit</button>
           </form>
        </div>

        <div className="table">
        {searchResults.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Teacher's ID</th>
            <th>Teacher's Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result) => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>
                <button onClick={() => handleEdit(result.id, 'newData')}>
                  Edit
                </button>
                <button onClick={() => handleDelete(result.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <center><p style={{color: 'black'}}>No data</p></center>
    )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Teacher