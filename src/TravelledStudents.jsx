import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentTable.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon

const TravelledStudents = () => {
  const [students, setStudents] = useState([]); // State to store fetched students
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Fetch students who travelled
  const fetchTravelledStudents = async () => {
    const sql = 'http://localhost:3000/students/travelled'; // Your API endpoint
    try {
      const response = await axios.get(sql);
      setStudents(response.data); // Set students in state
      setLoading(false); // Update loading state
    } catch (err) {
      setError('Error fetching students who travelled'); // Handle error
      setLoading(false); // Update loading state
    }
  };

  // useEffect for fetching data and polling
  useEffect(() => {
    fetchTravelledStudents(); // Initial fetch

    const interval = setInterval(() => {
      fetchTravelledStudents(); // Poll every 5 seconds
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Loading and error handling
  if (loading) {
    return <p>Loading travelled students...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.contacts.includes(searchTerm)
  );

  return (
    <div className='table-container'>
      <h2>Students Who Travelled</h2>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search Student..'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-bar'
        />
        <span className='search-icon'>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contacts</th>
            <th>Status</th> {/* Added Status Column */}
            <th>Program</th> {/* Program column */}
            <th>Tuition</th> {/* Tuition Column */}
            <th>Balance</th> {/* Balance Column */}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{`${student.firstname} ${student.lastname}`}</td>
                <td>{student.contacts}</td>
                <td>{student.status}</td> {/* Display Status */}
                <td>{student.program_name}</td> {/* Display Program Name */}
                <td>{student.tuition_fee}</td> {/* Display Tuition Fee */}
                <td>{student.balance}</td> {/* Display Balance */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='6'>No travelled students found</td>{' '}
              {/* Adjusted colspan */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TravelledStudents;
