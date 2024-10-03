import React, { useState } from 'react';
import { getNames } from 'country-list'; // Correct import
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io'; // Import close icon

const Modal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const countries = getNames(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!formData.firstName) validationErrors.firstName = 'First name is required';
    if (!formData.lastName) validationErrors.lastName = 'Last name is required';
    if (!formData.address) validationErrors.address = 'Address is required';
    if (!formData.country) validationErrors.country = 'Country is required';
    if (!formData.city) validationErrors.city = 'City is required';
    if (!formData.zipCode) validationErrors.zipCode = 'Zip code is required';
    if (!formData.phone) validationErrors.phone = 'Phone number is required';

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData); 
    } else {
      setErrors(validationErrors); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Shipping Details</h2>
        
        <form onSubmit={handleSubmit}>

          {/* First Name & Last Name in the Same Row */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
            </div>

            <div className="w-1/2">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && <p className="text-red-500">{errors.country}</p>}
            </div>

            <div className="w-1/2">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.city && <p className="text-red-500">{errors.city}</p>}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.zipCode && <p className="text-red-500">{errors.zipCode}</p>}
            </div>

            <div className="w-1/2">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
