// src/components/SearchFilter.js
import React, { useState, useEffect } from "react";

const SearchFilter = ({ data, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    const locations = [];
    data.forEach((item) => {
      location.indexOf(item.location) == -1 && locations.push(item.location);
    });
    setLocationList(locations);
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange(e.target.value, location, status); // Pass search term and filters
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    onFilterChange(searchTerm, e.target.value, status); // Pass filters
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onFilterChange(searchTerm, location, e.target.value); // Pass filters
  };

  return (
    <div>
      <div className="filter-bar">
        <div className="filter-item">
          <div className="filter-dropdown">
            <select value={location} onChange={handleLocationChange}>
              <option value="">Location</option>
              {locationList &&
                locationList.map((item, i) => (
                  <option value={item}>{item}</option>
                ))}
              {/* Add more locations as needed */}
            </select>
          </div>
          <div className="filter-dropdown">
            <select value={status} onChange={handleStatusChange}>
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              {/* Add more statuses as needed */}
            </select>
          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cameras..."
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchFilter;
