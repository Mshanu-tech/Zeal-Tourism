import React from 'react';
import { useLocation } from 'react-router-dom';

const UmrahaView = () => {
  const location = useLocation();
  const { packageData } = location.state;

  return (
    <div className="flex flex-col md:flex-row items-start p-6 max-w-6xl mx-auto bg-white">
      {/* Left section - Image and Thumbnails */}
      <div className="w-full md:w-1/2 p-4">
      {/* packageData.thumbnail ||  */}
        <img
          src={'https://easygoltd.com/wp-content/uploads/2022/06/parallexhajj-531x354.jpg'}
          alt={packageData.title || 'Umrah Package'}
          className="w-full h-auto rounded-lg"
        />
        <div className="flex mt-4 space-x-3">
          {/* Thumbnails */}
          {/* {packageData.images.length > 0 ? (
            packageData.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-12 h-12 rounded-lg"
              />
            ))
          ) : ( */}
            <img src="https://easygoltd.com/wp-content/uploads/2015/07/CRc6G4fUkAAjdYF-531x354.jpg" alt="Default Thumbnail" className="w-12 h-12 rounded-lg" />
          {/* )} */}
        </div>
      </div>

      {/* Right section - Product Details */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-2">{packageData.title || 'Umrah Package'}</h2>
        <p className="text-gray-600">Overview: {packageData.overview}</p>
        <p className="text-gray-600">Description: {packageData.description}</p>

        {/* Pricing */}
        <p className="text-gray-600">
          Price: {packageData.pricing.packageCost[0].amount} {packageData.pricing.packageCost[0].currency}
        </p>

        <div className="my-4">
          {packageData.rating.stars >= 4.5 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Top Rated
            </span>
          )}
        </div>

        {/* Inclusion */}
        <ul className="list-disc list-inside mb-4">
          {packageData.inclusion.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Exclusion */}
        <ul className="list-disc list-inside mb-4">
          <strong>Exclusions:</strong>
          {packageData.exclusion.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-lg">⭐</span>
            <span className="text-sm text-gray-600 ml-1">
              {packageData.rating.stars} ({packageData.rating.ratingCount} Reviews)
            </span>
          </div>
          {/* <a href="#" className="text-blue-600 text-sm">Read Reviews</a> */}
        </div>

        {/* Special Notes or Icons */}
        <div className="mt-4 flex space-x-4">
          {packageData.specialNotes?.map((note, index) => (
            <div key={index} className="text-center">
              <img src={note.icon} alt={`Feature ${index + 1}`} className="w-8 h-8" />
              <p className="text-xs mt-1">{note.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UmrahaView;
