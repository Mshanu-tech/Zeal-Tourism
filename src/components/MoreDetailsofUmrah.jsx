import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    right: 'auto',
    // bottom: 'auto',
    width: '90%',
    height: "90%",
    maxWidth: '650px',
    padding: '20px',
    borderRadius: '9px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};


const UmrahMoreDetailsModal = ({ isOpen, onClose, onSubmit, umrahData }) => {
  const [moreDetails, setMoreDetails] = useState({
    overview: umrahData?.moreDetails?.overview || '',
    tourOverview: umrahData?.moreDetails?.tourOverview || '',
    faculty: umrahData?.moreDetails?.faculty || '',
    inclusion: umrahData?.moreDetails?.inclusion || '',
    exclusion: umrahData?.moreDetails?.exclusion || '',
});

  const handleChange = (event, path) => {
    const { name, value } = event.target;

    setMoreDetails(prevState => {
      const updateNestedField = (obj, pathArr) => {
        if (pathArr.length === 1) {
          return { ...obj, [pathArr[0]]: value };
        }

        const [firstKey, ...restKeys] = pathArr;
        return {
          ...obj,
          [firstKey]: updateNestedField(obj[firstKey] || {}, restKeys),
        };
      };

      const updatedMoreDetails = updateNestedField(prevState, path.split('.'));
      return updatedMoreDetails;
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(moreDetails); // Pass data to parent component
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="More Details" style={customStyles}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">More Details</h2>
        <form onSubmit={handleSubmit}>
          <h6 className='font-bold mb-4'>Overview</h6>
          <textarea
            name="overview"
            value={moreDetails.overview || ""}
            onChange={(e) => handleChange(e, 'overview')}
            placeholder="Enter Overview"
            style={{ width: "100%" }}
          />
          <h6 className='font-bold mb-4'>Tour Overview</h6>
          <textarea
            name="tourOverview"
            value={moreDetails.tourOverview || ""}
            onChange={(e) => handleChange(e, 'tourOverview')}
            placeholder="Enter Tour Overview"
            className="form-textarea"
            style={{ width: "100%" }}
          />

          <h6 className='font-bold mb-4'>Faculty</h6>
          <textarea
            name="faculty"
            value={moreDetails.faculty || ""}
            onChange={(e) => handleChange(e, 'faculty')}
            placeholder="Enter Faculty"
            className="form-textarea"
            style={{ width: "100%" }}
          />

          <h6 className='font-bold mb-4'>Inclusion</h6>
          <textarea
            name="inclusion"
            value={moreDetails.inclusion || ""}
            onChange={(e) => handleChange(e, 'inclusion')}
            placeholder="Enter Inclusion"
            className="form-textarea"
            style={{ width: "100%" }}
          />

          <h6 className='font-bold mb-4'>Exclusion</h6>
          <textarea
            name="exclusion"
            value={moreDetails.exclusion || ""}
            onChange={(e) => handleChange(e, 'exclusion')}
            placeholder="Enter Exclusion"
            className="form-textarea"
            style={{ width: "100%" }}
          />
          <div className="mt-3 flex justify-end space-x-2">
            <button type="submit" className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Save Details
            </button>
            <button type="button" onClick={onClose} className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UmrahMoreDetailsModal;