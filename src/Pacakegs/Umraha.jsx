// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import AddUmrahaPackageModal from "./AddUmrahaPackageModal"; // Import the modal component
import packge from '../assets/Images/umraga.png'
import axios from 'axios'
import UmrahaPackageView from "./UmrahaPackageView";
import { useNavigate } from "react-router-dom";

const Umraha = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [packages, setPackages] = useState(null);
  const [editPackage, setEditPackage] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/umrahaall/'); // Add your backend URL here

        setPackages(response.data.results); // Set the response data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEdit = (pkg) => {
    console.log(`Edit package with id: ${pkg._id}`);
    setEditPackage(pkg)
    setModalIsOpen(true);

  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/umrahaall/${id}`);
      console.log(`Package with id: ${id} deleted successfully`);
      setPackages((prevPackages) => prevPackages.filter(pkg => pkg._id !== id));
    } catch (error) {
      console.error('Error deleting package:', error);

    }
  };

  const handleView = (pkg) => {    
    navigate(`/Umrahaall/view-package/${pkg._id}`, {state: {packageData: pkg }})
  };

  const handleAddPackage = async (newPackage) => {
    // Add the new package to the list of packages
    console.log(newPackage);
    
    const updatedPackages = [...packages, { id: packages.length + 1, ...newPackage }];
    setPackages(updatedPackages);

    try {
      // Send the new package to the backend
      const response = await axios.post('http://localhost:3002/api/umrahaall', {
        ...newPackage // Send the new package data, not the whole packages array
      },
        {

          headers: {
            'Content-Type': 'application/json', // specify JSON if needed
            'x-access-token': 'Beareryour_token_here', // if authentication is required
          },
        }

      );

      console.log('Response from backend:', response.results);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message); // Catch and handle errors
    }
  };

  const handleUpdatePackage = async (updatePackage) => {
    try { 
      const response = await axios.put(`http://localhost:3002/api/umrahaall/${updatePackage._id}`, 
        updatePackage,  // Directly send the data without wrapping it in another object
        {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'Bearer your_token_here',
            },
        }
    );
    
      const updatedPackages = packages.map(pkg => 
        pkg._id === updatePackage._id ? { ...pkg, ...updatePackage } : pkg
      );
      setPackages(updatedPackages);
      setEditPackage(null);
      setModalIsOpen(false); 
      console.log('Updated package:', response);

    } catch (error) {
      console.error('Error updating package:', error);
      
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-4">Umraha Packages</h1>
        <p className="text-gray-700">
          Browse our collection of Umraha and special occasions from around the world.
        </p>
      </div>

      {/* Umraha Package Advertisement Section */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mb-6 flex items-center space-x-6">
        <img
          src={packge} // Assuming the first package is highlighted
          alt="Umraha Package"
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">Special Umraha Package</h2>
          <p className="text-gray-700 mb-4">Description of the special package.</p>
          <div className="text-lg font-semibold mb-2">Location: Special Location</div>
          <div className="text-lg font-semibold mb-2">Price: $XXX</div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            View More
          </button>
        </div>
      </div>

      {/* Add New Package Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add New Package</h2>
          <button
            className="bg-green-500 text-white p-2 rounded-full"
            onClick={openModal} // Open modal
          >
            +
          </button>
        </div>
        <p className="text-gray-600">
          Add a new Umraha package to our collection.
        </p>
      </div>

      {/* Packages List Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">All Packages</h2>
        {/* Table Header */}
        <div className="grid grid-cols-5 font-bold text-gray-700 mb-2">
          <div>Name</div>
          <div>Description</div>
          <div>Location</div>
          <div>Image</div>
          <div>Actions</div>
        </div>

        {/* Package Rows */}
        {packages && (
          packages.map((pkg) => (
            <div key={pkg._id} className="grid grid-cols-5 py-2 border-b">
              <div>{pkg.title}</div>
              <div>{pkg.description}</div>
              <div>{pkg.location}</div>
              <div>
                <img
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
              <div className="flex space-x-2">
                <FaEye
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleView(pkg)}
                />
                {/* Pass the entire package object to the handleEdit function */}
                <FaEdit
                  className="text-green-500 cursor-pointer"
                  onClick={() => handleEdit(pkg)}
                />
                <FaTrashAlt
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(pkg._id)}
                />
              </div>
            </div>
          ))
        )}

      </div>

      {/* AddUmrahaPackageModal Component */}
      {
  editPackage ? (
    <AddUmrahaPackageModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      editPackage={editPackage}
      onSubmit={handleUpdatePackage}
    />
  ) : (
    <AddUmrahaPackageModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      onSubmit={handleAddPackage}
    />
  )
}


    </div>
  );
};

export default Umraha;
