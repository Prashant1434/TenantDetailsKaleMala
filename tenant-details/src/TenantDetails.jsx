import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TenantDetails = () => {
  const [formData, setFormData] = useState({
    roomNo: '',
    fullName: '',
    address: '',
    panNo: '',
    aadharNo: '',
    mobileNo: '',
    altMobileNo: '',
    photo: null,
    aadharPhoto: null,
    panPhoto: null,
    dependents: [{ name: '', relation: '', dependentMobileNo: '' }],
  });

  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleDependentChange = (index, event) => {
    const updatedDependents = formData.dependents.map((dependent, i) =>
      i === index ? { ...dependent, [event.target.name]: event.target.value } : dependent
    );
    setFormData({ ...formData, dependents: updatedDependents });
  };

  const addDependent = () => {
    setFormData({
      ...formData,
      dependents: [...formData.dependents, { name: '', relation: '', dependentMobileNo: '' }],
    });
  };

  const handleFileRead = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result); // This will give you a Base64 encoded string
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert image files to Base64
    const aadharPhotoBase64 = await handleFileRead(formData.aadharPhoto);
    const panPhotoBase64 = await handleFileRead(formData.panPhoto);
    const photoBase64 = await handleFileRead(formData.photo);

    const jsonData = {
      roomNo: formData.roomNo,
      fullName: formData.fullName,
      address: formData.address,
      panNo: formData.panNo,
      aadharNo: formData.aadharNo,
      mobileNo: formData.mobileNo,
      altMobileNo: formData.altMobileNo,
      aadharPhoto: aadharPhotoBase64,
      panPhoto: panPhotoBase64,
      photo: photoBase64,
      dependents: formData.dependents,
    };

    try {
      // Send the JSON data to the server
      const response = await fetch('http://localhost:3001/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData), // Convert to JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);

      // Show success message and reset form
      setSuccessMessage('Data saved successfully!');
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      roomNo: '',
      fullName: '',
      address: '',
      panNo: '',
      aadharNo: '',
      mobileNo: '',
      altMobileNo: '',
      photo: null,
      aadharPhoto: null,
      panPhoto: null,
      dependents: [{ name: '', relation: '', dependentMobileNo: '' }],
    });
    setSuccessMessage(''); // Clear success message after resetting
  };

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px 20px', marginRight: '10px' }}
        >
          Home
        </button>
      </div>
      <h2 style={styles.title}>Personal Information Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Room No:</label>
          <input
            type="text"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>PAN No:</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Aadhar No:</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Alternate Mobile No:</label>
          <input
            type="text"
            name="altMobileNo"
            value={formData.altMobileNo}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Aadhar Photo:</label>
          <input
            type="file"
            name="aadharPhoto"
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Tenant Photo:</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>PAN Photo:</label>
          <input
            type="file"
            name="panPhoto"
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />
        </div>

        <div>
          <h3>Dependent Details</h3>
          {formData.dependents.map((dependent, index) => (
            <div key={index} style={styles.dependentGroup}>
              <label style={styles.label}>Dependent Name:</label>
              <input
                type="text"
                name="name"
                value={dependent.name}
                onChange={(event) => handleDependentChange(index, event)}
                style={styles.input}
                required
              />
              <label style={styles.label}>Relation:</label>
              <input
                type="text"
                name="relation"
                value={dependent.relation}
                onChange={(event) => handleDependentChange(index, event)}
                style={styles.input}
                required
              />
              <label style={styles.label}>Dependent Mobile No:</label>
              <input
                type="text"
                name="dependentMobileNo"
                value={dependent.dependentMobileNo}
                onChange={(event) => handleDependentChange(index, event)}
                style={styles.input}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addDependent} style={styles.addButton}>
            Add Another Dependent
          </button>
        </div>

        <div>
          <button type="submit" style={styles.submitButton}>Submit</button>
        </div>
      </form>

      {successMessage && (
        <div style={styles.successMessage}>
          {successMessage} {/* Display success message */}
        </div>
      )}

      {/* Previous data display logic remains here */}
    </div>
  );
};

// Basic styles for the form
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  fileInput: {
    border: 'none',
  },
  dependentGroup: {
    marginBottom: '10px',
  },
  addButton: {
    margin: '10px 0',
    padding: '8px 12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  successMessage: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
    textAlign: 'center',
  },
};

export default TenantDetails;
