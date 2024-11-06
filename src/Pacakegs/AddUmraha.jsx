import React, { useEffect, useState } from "react";

const AddUmrahaPackageModal = ({ isOpen, onRequestClose, onSubmit, editPackage }) => {
  const [packageData, setPackageData] = useState({
    title: '',
    description: '',
    images: [''],
    thumbnail: '',
    pdf: [{ type: '', link: '' }],
    details: '',
    faculty: [''],
    overview: '',
    itinerary: [{ title: '', description: '', place: '', startDate: '', endDate: '', details: [{ title: '', icon: '', category: '', location: '', room: '', checkIn: '', checkout: '' }] }],
    tourOverview: '',
    inclusion: [''],
    exclusion: [''],
    pricing: {
      packageCost: [{ title: '', amount: 980, currency: '' }],
      tax: [{ title: '', amount: 40, currency: '' }]
    },
    bookingPolicy: {
      cancellation: [{ title: '', description: '' }],
      childPolicy: [{ title: '', description: '' }],
      otherPolicies: [{ title: '', description: '' }]
    },
    faq: [{ question: '', answer: '' }],
  });

  const [page, setPage] = useState(1); // Track the current page

  useEffect(() => {
    if (editPackage) {
      setPackageData(editPackage); // Populate the form with editPackage data if available
    } else {
    setPackageData({
        title: '',
        description: 'sdf',
        images: [''],
        thumbnail: '',
        pdf: [{ type: '', link: '' }],
        faculty: ['sdf'],
        overview: 'sdf',
        itinerary: [{ title: 'sdf', description: 'sfd', place: 'dfs', startDate: '', endDate: '', details: [{ title: 'sdfsdf', icon: 'sdf', category: 'sdf', location: 'sdf', room: '', checkIn: '', checkout: '' }] }],
        tourOverview: 'fds',
        inclusion: ['sdf'],
        exclusion: ['sdf'],
        pricing: {
          packageCost: [{ title: 'sdf', amount: 10, currency: 'weq' }],
          tax: [{ title: 'wer', amount: 40, currency: 'qe' }]
        },
        bookingPolicy: {
          cancellation: [{ title: 'wer', description: 'sdf' }],
          childPolicy: [{ title: 'fg', description: 'sd' }],
          otherPolicies: [{ title: 'er', description: 'sdf' }]
        },
        faq: [{ question: 'dsf', answer: 'sdf' }],
      });
    }
  }, [editPackage]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevState) => {
      const keys = name.split('.')
      let updatedState = { ...prevState };

      let current = updatedState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updatedState;
    });
  };

  const handleArrayChange = (index, e, field, subfield = null) => {
    setPackageData((prevState) => {
      let updatedField = prevState;
      const fieldParts = field.split('.');
      fieldParts.forEach(part => {
        updatedField = updatedField[part];
      });

      if (Array.isArray(updatedField)) {
        const updatedArray = [...updatedField];
        if (subfield) {
          updatedArray[index] = { ...updatedArray[index], [subfield]: e.target.value };
        } else {
          updatedArray[index] = e.target.value;
        }

        let updatedPackageData = { ...prevState };
        let nested = updatedPackageData;
        fieldParts.forEach((part, i) => {
          if (i === fieldParts.length - 1) {
            nested[part] = updatedArray;
          } else {
            nested = nested[part];
          }
        });
        return updatedPackageData;
      } else {
        console.error(`Expected ${field} to be an array but got:`, updatedField);
        return prevState;
      }
    });
  };

  const handleAddItem = (key, subkey) => {
    setPackageData((prevState) => {
      // Check if it's an array inside a nested object (like bookingPolicy.otherPolicies)
      if (subkey) {
        return {
          ...prevState,
          [key]: {
            ...prevState[key],
            [subkey]: [...prevState[key][subkey], { title: '', description: '' }]  // Add empty policy object
          }
        };
      } else {
        // For keys like 'faq' (direct array in packageData)
        return {
          ...prevState,
          [key]: [...prevState[key], { question: '', answer: '' }]  // Add empty FAQ object
        };
      }
    });
  };


  const handleRemoveItem = (key, index) => {
    setPackageData((prevState) => {
      // Split the key into segments (for nested keys)
      const keys = key.split('.');

      // Access the array by drilling into nested keys
      let dataToUpdate = prevState;
      for (let i = 0; i < keys.length - 1; i++) {
        dataToUpdate = dataToUpdate[keys[i]];
      }

      // Now dataToUpdate[keys[keys.length - 1]] should be the array
      const arrayKey = keys[keys.length - 1];
      const updatedArray = [...dataToUpdate[arrayKey]];
      updatedArray.splice(index, 1);

      // Create a new state object
      return {
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]], // Preserve other values in the nested object
          [arrayKey]: updatedArray // Update the specific array
        }
      };
    });
  };



  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

// Handle multiple images upload

const handleThumbnailUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setPackageData((prevData) => ({
      ...prevData,
      thumbnail: file, // Store file object for upload
    }));
  }
};

const handleImagesUpload = (e) => {
  const files = Array.from(e.target.files);
  setPackageData((prevData) => ({
    ...prevData,
    images: [...prevData.images, ...files], // Store files for upload
  }));
};



  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPackage) {
      onSubmit(packageData); // Call the submit handler
    } else {
      onSubmit(packageData); // Handle new package submission
    }
    onRequestClose(); // Close the modal after submitting
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Add New Visa Package</h2>

        {/* Page 1: Basic Info & Pricing Details */}
        {page === 1 && (
          <form className="space-y-4">
            <input
              name="title"
              value={packageData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border"
            />
            <textarea
              name="description"
              value={packageData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border"
            />
           

      <input
        type="file"
        accept="image/*"
        onChange={handleThumbnailUpload}
        className="w-full p-2 border"
      />
      {/* {packageData.thumbnail && (
        <img
          src={packageData.thumbnail}
          alt="Thumbnail Preview"
          className="mt-2 w-32 h-32 object-cover"
        />
      )} */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImagesUpload}
        className="w-full p-2 border"
      />
      {/* <div className="flex gap-2 mt-2">
        {packageData.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Image ${index + 1}`}
            className="w-24 h-24 object-cover"
          />
        ))}
      </div>            */}
       <textarea
              name="details"
              value={packageData.details}
              onChange={handleChange}
              placeholder="Details"
              className="w-full p-2 border"
            />

            {/* Faculty */}
            <h3 className="text-lg font-semibold">Faculty</h3>
            {packageData.faculty.map((item, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  placeholder="Faculty Member"
                  value={item}
                  onChange={(e) => handleArrayChange(index, e, 'faculty')}
                  className="w-full p-2 border"
                />
              </div>
            ))}
          </form>
        )}

        {/* Page 2: Itinerary, Inclusions, & Pricing */}
        {page === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Itinerary</h3>
            {packageData.itinerary.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => handleArrayChange(index, e, 'itinerary', 'title')}
                  className="w-full p-2 border"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleArrayChange(index, e, 'itinerary', 'description')}
                  className="w-full p-2 border"
                />
                <input
                  type="text"
                  placeholder="Place"
                  value={item.place}
                  onChange={(e) => handleArrayChange(index, e, 'itinerary', 'place')}
                  className="w-full p-2 border"
                />
                <input
                  type="date"
                  placeholder="startDate"
                  value={item.startDate}
                  onChange={(e) => handleArrayChange(index, e, 'itinerary', 'startDate')}
                  className="w-full p-2 border"
                />
                <input
                  type="date"
                  placeholder="endDate"
                  value={item.endDate}
                  onChange={(e) => handleArrayChange(index, e, 'itinerary', 'endDate')}
                  className="w-full p-2 border"
                />
              </div>
            ))}
          </div>
        )}

        {/* Page 3: Booking Policy */}
        {page === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Booking Policy</h3>
            {packageData.bookingPolicy.cancellation.map((policy, index) => (
              <div>
                {/* Cancellation Policy */}
                <h4 className="font-medium">Cancellation Policy</h4>
                <input
                  type="text"
                  placeholder="Cancellation Title"
                  value={policy.title}
                  onChange={(e) => handleArrayChange(index, e, 'bookingPolicy.cancellation', 'title')}
                  className="w-full p-2 border"
                />
                <textarea
                  placeholder="Cancellation Description"
                  value={policy.description}
                  onChange={(e) => handleArrayChange(index, e, 'bookingPolicy.cancellation', 'description')}
                  className="w-full p-2 border"
                />
              </div>
            ))}

            {packageData.bookingPolicy.childPolicy.map((policy, index) => (
              <div>
                {/* Child Policy */}
                <h4 className="font-medium">Child Policy</h4>
                <input
                  type="text"
                  placeholder="Child Policy Title"
                  value={policy.title}
                  onChange={(e) => handleArrayChange(0, e, 'bookingPolicy.childPolicy', 'title')}
                  className="w-full p-2 border"
                />
                <textarea
                  placeholder="Child Policy Description"
                  value={policy.description}
                  onChange={(e) => handleArrayChange(0, e, 'bookingPolicy.childPolicy', 'description')}
                  className="w-full p-2 border"
                />
              </div>
            ))}


            {/* Other Policies */}
            <h4 className="font-medium">Other Policies</h4>
            {packageData.bookingPolicy.otherPolicies.map((policy, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Other Policy Title"
                    value={policy.title}
                    onChange={(e) => handleArrayChange(index, e, 'bookingPolicy.otherPolicies', 'title')}
                    className="w-full p-2 border"
                  />
                  <textarea
                    placeholder="Other Policy Description"
                    value={policy.description}
                    onChange={(e) => handleArrayChange(index, e, 'bookingPolicy.otherPolicies', 'description')}
                    className="w-full p-2 border"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem('bookingPolicy.otherPolicies', index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Button to add more "Other Policies" */}
            <button
              type="button"
              onClick={() => handleAddItem('bookingPolicy', 'otherPolicies')}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Another Policy
            </button>

          </div>
        )}

        {/* Page 4: FAQs */}
        {/* Page 4: FAQs */}
        {page === 4 && (
          <div className="space-y-4">
            <h4 className="font-medium">Pricing</h4>
            {packageData.pricing.packageCost.map((price, index) => (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="title"
                  value={price.title}
                  onChange={(e) => handleArrayChange(index, e, 'pricing.packageCost', 'title')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="amount"
                  value={price.amount}
                  onChange={(e) => handleArrayChange(index, e, 'pricing.packageCost', 'amount')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="currency"
                  value={price.currency}
                  onChange={(e) => handleArrayChange(index, e, 'pricing.packageCost', 'currency')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}

            <h4 className="font-medium">Pricing</h4>
            {packageData.pricing.tax.map((price, index) => (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="title"
                  value={price.title}
                  onChange={(e) => handleArrayChange(index, e, 'pricing.tax', 'title')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="amount"
                  value={price.amount}
                  onChange={(e) => handleArrayChange(index, e, 'pricing.tax', 'amount')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="currency"
                  value={price.currency}
                  onChange={(e) => handleArrayChange(index, e, 'pricing.tax', 'currency')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}

            <h3 className="text-lg font-semibold">FAQs</h3>
            {Array.isArray(packageData.faq) && packageData.faq.length > 0 ? (
              packageData.faq.map((faq, index) => (
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
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('faq', index)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No FAQs added yet</p>
            )}
            <button
              type="button"
              onClick={() => handleAddItem('faq')}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Add FAQ
            </button>

          </div>
        )}






        <div className="mt-4 flex justify-between">
          {page > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
          )}
          {page < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUmrahaPackageModal;
