import React, { useState } from 'react';
import axios from 'axios';
import './PaymentForm.css';

const PaymentForm = ({ studentId, studentName, balance, closeModal }) => {
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amountPaid || !paymentDate || !paymentMethod) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    try {
      await axios.post('http://localhost:3000/payments', {
        student_id: studentId,
        amount_paid: amountPaid,
        payment_date: paymentDate,
        payment_method: paymentMethod,
      });

      // Show success message with delay
      setSuccessMessage('Thank you! Payment successfully processed. ✔️');
      setErrorMessage('');
      setAmountPaid('');
      setPaymentDate('');
      setPaymentMethod('');

      setTimeout(() => {
        setSuccessMessage('');
        closeModal();
      }, 5000); // Hide after 5 seconds
    } catch (error) {
      setErrorMessage(
        'Failed to process payment. Please try again. ' +
          (error.response?.data?.error || error.message)
      );
      setSuccessMessage('');
    }
  };

  return (
    <div className='payment-form'>
      <h2 className='payment-form-title'>
        Payment for {studentName}{' '}
        <span className='balance'>(Balance: ${balance})</span>
      </h2>

      {errorMessage && (
        <div className='feedback error-message'>
          <i className='error-icon'>⚠️</i> {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className='feedback success-message'>
          <i className='success-icon'>✅</i> {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className='form-grid'>
        <div className='form-group'>
          <label htmlFor='amountPaid'>Amount Paid</label>
          <input
            type='number'
            id='amountPaid'
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='paymentDate'>Payment Date</label>
          <input
            type='date'
            id='paymentDate'
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='paymentMethod'>Payment Method</label>
          <select
            id='paymentMethod'
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value=''>Select Method</option>
            <option value='cash'>Cash</option>
            <option value='card'>Card</option>
            <option value='bank_transfer'>Bank Transfer</option>
            <option value='online'>Online Payment</option>
          </select>
        </div>

        <button type='submit' className='submit-btn'>
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
