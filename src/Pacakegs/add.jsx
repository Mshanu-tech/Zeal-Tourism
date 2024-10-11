// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Set the root element for modal accessibility
Modal.setAppElement('#root');

// eslint-disable-next-line react/prop-types
const AddUmrahaPackageModal = ({ isOpen, onRequestClose, onSubmit, editPackage,updatedPackage }) => {
  const [packageData, setPackageData] = useState({
      title: '',
      description: '',
      images: [''],
      thumbnail: '',
      pdf: [{ type: '', link: '' }],
      details: { share: '', fcb: '', from: '' },
      faculty: [''],
      overview: '',
      itinerary: [{ title: '', description: '', place: '', startDate: '', endDate: '', details: [{ title: '', icon: '', category: '', location: '', room: '', checkIn: '', checkout: '' }] }],
      tourOverview: '',
      inclusion: [''],
      exclusion: [''],
      timings: [{ title: '', time: '' }],
      pricing: {
        packageCost: [{ title: 'dfg', amount: 9, currency: 'dfg' }],
        tax: [{ title: 'dfg', amount: 8, currency: 'dfg' }]
      },
      bookingPolicy: {
        cancellation: { title: 'fdgd', description: '' },
        childPolicy: { title: 'dfg', description: '' },
        otherPolicies: [{ title: 'dfg', description: '' }]
      },
      faq: [{ question: '', answer: '' }],
      rating: {
        reviews: [''],
        stars: 4.0,
        ratingCount: 0,
        review: '',
        details: []
      }
    });


  useEffect(() => {
    if (editPackage) {
      setPackageData(editPackage)
    } else {
      setPackageData({
        title: '',
        description: '',
        images: [''],
        thumbnail: '',
        pdf: [{ type: '', link: '' }],
        details: { share: '', fcb: '', from: '' },
        faculty: [''],
        overview: '',
        // itinerary: [{ title: '', description: '', place: '', startDate: '', endDate: '', details: [{ title: '', icon: '', category: '', location: '', room: '', checkIn: '', checkout: '' }] }],
        tourOverview: '',
        inclusion: [''],
        exclusion: [''],
        timings: [{ title: '', time: '' }],
        pricing: {
          packageCost: [{ title: '', amount: 0, currency: '' }],
          tax: [{ title: '', amount: 0, currency: '' }]
        },
        bookingPolicy: {
          cancellation: { title: '', description: '' },
          childPolicy: { title: '', description: '' },
          otherPolicies: [{ title: '', description: '' }]
        },
        faq: [{ question: '', answer: '' }],
        rating: {
          reviews: [''],
          stars: 4.0,
          ratingCount: 0,
          review: '',
          details: []
        }
      });
    }

  }, [editPackage])

  // fetch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevState) => {
      const keys = name.split('.')
      let updatedState = { ...prevState };

      let current = updatedState;
      // Traverse the object until the last key
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
  
      // Update the specific key's value
      current[keys[keys.length - 1]] = value;
  
      return updatedState;
    });
  };

  const handleArrayChange = (index, e, field, subfield = null) => {
    setPackageData((prevState) => {
      // Drill down if field contains nested arrays inside objects
      let updatedField = prevState;
      const fieldParts = field.split('.');  // In case field is something like 'pricing.packageCost'
  
      // Traverse through field parts to access the final array
      fieldParts.forEach(part => {
        updatedField = updatedField[part];
      });
  
      // Check if the accessed field is an array
      if (Array.isArray(updatedField)) {
        // Create a clone of the array and update the specific item at 'index'
        const updatedArray = [...updatedField];
        if (subfield) {
          updatedArray[index] = { ...updatedArray[index], [subfield]: e.target.value };
        } else {
          updatedArray[index] = e.target.value;
        }
  
        // Traverse back up to update the original packageData state
        let updatedPackageData = { ...prevState };
        let nested = updatedPackageData;
        fieldParts.forEach((part, i) => {
          if (i === fieldParts.length - 1) {
            nested[part] = updatedArray; // Set the updated array back
          } else {
            nested = nested[part]; // Drill deeper
          }
        });
  
        return updatedPackageData;
      } else {
        console.error(`Expected ${field} to be an array but got:`, updatedField);
        return prevState;
      }
    });
  };
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editPackage){
      updatedPackage(packageData)
    }else{
      onSubmit(packageData); // Call the submit handler from props
    }
    onRequestClose(); // Close the modal after submitting
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Umraha Package"
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">
        {editPackage ? 'Edit Umraha Package' : 'Add New Umraha Package'}
      </h2>
 
      <form className="space-y-4" onSubmit={handleSubmit}>
  <h2 className="text-lg font-bold">Create Umrah Package</h2>
  
  {/* Title */}
  <input
    type="text"
    name="title"
    value={packageData.title}
    placeholder="Package Name"
    onChange={handleChange}
    className="w-full p-2 border border-gray-300 rounded-md"
    required
  />
  
  {/* Description */}
  <textarea
    name="description"
    value={packageData.description}
    placeholder="Package Description"
    onChange={handleChange}
    className="w-full p-2 border border-gray-300 rounded-md"
  />
  
  {/* Thumbnail */}
  <input
    type="text"
    name="thumbnail"
    value={packageData.thumbnail}
    placeholder="Thumbnail URL"
    onChange={handleChange}
    className="w-full p-2 border border-gray-300 rounded-md"
  /> 

  <h3 className="text-lg font-semibold">Faculty</h3>
  {packageData.faculty.map((item, index) => (
    <div key={index} className="space-y-2">
      <input
        type="text"
        placeholder="Faculty Member"
        value={item}
        onChange={(e) => handleArrayChange(index,e, 'faculty')}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  ))}


  {/* Overview */}
  <textarea
    name="overview"
    value={packageData.overview}
    placeholder="Overview"
    onChange={handleChange}
    className="w-full p-2 border border-gray-300 rounded-md"
  />
  
  {/* Inclusions */}
  <h3 className="text-lg font-semibold">Inclusion</h3>
  {packageData.inclusion.map((item, index) => (
    <div key={index} className="space-y-2">
      <input
        type="text"
        placeholder="Inclusion"
        value={item}
        onChange={(e) => handleArrayChange(index, e, 'inclusion')}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  ))}

  {/* Pricing */}
  <h3 className="text-lg font-semibold">Pricing</h3>
  <input
  type="text"
  name="pricing.packageCost.title"
  value={packageData.pricing.packageCost[0].title}
  placeholder="Package Cost Title"
  onChange={(e) => handleArrayChange(0, e, 'pricing.packageCost', 'title')}
  className="w-full p-2 border border-gray-300 rounded-md"
/>

<input
  type="number"
  name="pricing.packageCost.amount"
  value={packageData.pricing.packageCost[0].amount}
  placeholder="Amount"
  onChange={(e) => handleArrayChange(0, e, 'pricing.packageCost', 'amount')}
  className="w-full p-2 border border-gray-300 rounded-md"
/>

  <input
    type="text"
    name="pricing.packageCost.currency"
    value={packageData.pricing.packageCost[0].currency}
    placeholder="Currency"
    onChange={(e) => handleArrayChange(0, e, 'pricing.packageCost', 'currency')}
    className="w-full p-2 border border-gray-300 rounded-md"
  />

<input
  type="text"
  name="pricing.tax.title"
  value={packageData.pricing.tax[0].title}
  placeholder="Package Cost Title"
  onChange={(e) => handleArrayChange(0, e, 'pricing.tax', 'title')}
  className="w-full p-2 border border-gray-300 rounded-md"
/>

<input
  type="number"
  name="pricing.tax.amount"
  value={packageData.pricing.tax[0].amount}
  placeholder="Amount"
  onChange={(e) => handleArrayChange(0, e, 'pricing.tax', 'amount')}
  className="w-full p-2 border border-gray-300 rounded-md"
/>

  <input
    type="text"
    name="pricing.tax.currency"
    value={packageData.pricing.tax[0].currency}
    placeholder="Currency"
    onChange={(e) => handleArrayChange(0, e, 'pricing.tax', 'currency')}
    className="w-full p-2 border border-gray-300 rounded-md"
  />

  {/* Booking Policy */}
  <h3 className="text-lg font-semibold">Booking Policy</h3>
<input
  type="text"
  name="bookingPolicy.cancellation.title"  // Match the state structure
  value={packageData.bookingPolicy.cancellation.title}
  placeholder="Cancellation Title"
  onChange={handleChange}
  className="w-full p-2 border border-gray-300 rounded-md"
/>
<textarea
  name="bookingPolicy.cancellation.description"  // Match the state structure
  value={packageData.bookingPolicy.cancellation.description}
  placeholder="Cancellation Description"
  onChange={handleChange}
  className="w-full p-2 border border-gray-300 rounded-md"
/>


  {/* FAQ */}
  <h3 className="text-lg font-semibold">FAQ</h3>
  {packageData.faq.map((faq, index) => (
    <div key={index} className="space-y-2">
      <input
        type="text"
        placeholder="Question"
        value={faq.question}
        onChange={(e) => handleArrayChange(index, e, 'faq', 'question')}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <textarea
        placeholder="Answer"
        value={faq.answer}
        onChange={(e) => handleArrayChange(index, e, 'faq', 'answer')}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  ))}

  <div className="flex justify-end">
    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
      Submit
    </button>
  </div>
</form>

    </Modal>
  );

};

export default AddUmrahaPackageModal;
