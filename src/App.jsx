import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentTable from './StudentTable';
import AddStudentForm from './AddStudentForm';
import FinancePart from './FinancePart';
import StudentsOnLoan from './StudentsOnLoan';
import TravelledStudents from './TravelledStudents'; // Import the TravelledStudents component
import NotCompletedStudents from './NotCompletedStudents'; // Import the NotCompletedStudents component
import CompletedStudents from './CompletedStudents'; // Import the CompletedStudents component

const App = () => {
  const [students, setStudents] = useState([]); // State to hold students data
  const [loading, setLoading] = useState(true); // Loading state for student data
  const [error, setError] = useState(null); // Error state for student data

  // Fetch students data from the backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students');
      setStudents(response.data); // Set the fetched students data
      setLoading(false); // Update loading state
    } catch (error) {
      console.error('Error fetching students data:', error);
      setError('Error fetching students data'); // Handle error
      setLoading(false); // Update loading state
    }
  };

  // Use setInterval to fetch students data every 10 seconds for real-time updates
  useEffect(() => {
    fetchStudents(); // Initial fetch of students

    const interval = setInterval(() => {
      fetchStudents(); // Periodically fetch student data
    }, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Function to add a new student
  const addStudent = async (student) => {
    try {
      await axios.post('http://localhost:3000/students', student); // Post new student
      fetchStudents(); // Refresh the student list
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Function to update a student's status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/students/${id}/status`, {
        status,
      }); // Update status
      fetchStudents(); // Refresh the student list after update
    } catch (error) {
      console.error('Error updating student status:', error);
    }
  };

  return (
    <div className='App'>
      <h1>Student Management</h1>
      <AddStudentForm addStudent={addStudent} />
      <StudentsOnLoan students={students} fetchStudents={fetchStudents} />
      <StudentTable students={students} updateStatus={updateStatus} />
      <TravelledStudents
        students={students}
        loading={loading}
        error={error}
      />{' '}
      {/* Pass students, loading, and error props */}
      <NotCompletedStudents students={students} />{' '}
      {/* Include the NotCompletedStudents component */}
      <CompletedStudents students={students} />{' '}
      {/* Include the CompletedStudents component */}
      <FinancePart students={students} updateStatus={updateStatus} />
    </div>
  );
};

export default App;
