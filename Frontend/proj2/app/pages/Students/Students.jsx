"use client"
import React, { useState } from 'react'
import { FaAddressBook } from "react-icons/fa";
import { HiArrowCircleLeft } from "react-icons/hi";
import { HiPrinter } from "react-icons/hi";
import { RiSave2Line } from "react-icons/ri";
import axios from 'axios';
import { useRouter } from 'next/navigation';

import './Students.css'

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  
  const handleBack = () => {
      router.back();
    };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8081/arci', searchTerm);
      setSearchResults(response.data);
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
    e.preventDefault()
    setSearchTerm(searchTerm=>({...searchTerm, [e.target.name]: e.target.value}))
  }

  return (
    <div className='s-wrapper'>
      <div className="container1">
        <div className="h-container1">
        <FaAddressBook size="30px"/>
        <strong><h1>Student</h1></strong>
        </div>
        <div className="sections1">

          <div className="save1">
            <button className='btn1'><HiArrowCircleLeft size='20px' onClick={handleBack}/>Go Back</button>
            <button className='btn'><RiSave2Line size='20px'/>Save</button>
            <button className='btn1'><HiPrinter size='20px'/>Print</button>
          </div>

          <div className="search1">
            <form action="">
            <h2>Student Name:</h2>
            <input type="text" onChange={Change} name='name'/>
            <h2>Subject:</h2>
            <input type="text" onChange={Change} name='name'/>
            <h2>Teacher Name:</h2>
            <input type="text" onChange={Change} name='name'/>
             <button className='btn3' onSubmit={handleSearch}>Submit</button>
             </form>
          </div>

          <div className="table1">
          {searchResults.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Subject ID</th>
              <th>Subject Name</th>
              <th>Teachers Name</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result) => (
              <tr key={result.students.id}>
                <td>{result.students.name}</td>
                <td>{result.teachers.name}</td>
                <td>{result.subjects.name}</td>
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

export default Students