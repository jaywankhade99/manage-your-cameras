// src/components/CameraTable.js
import React, { useState, useEffect } from "react";
import { fetchCameras, updateCameraStatus } from "../api";
import Pagination from "./Pagination";
import SearchFilter from "./SearchFilter";
import StatusToggle from "./StatusToggle";
import DeleteButton from "./DeleteButton";
import "../App.css";
import PieChart from "./PieChart";

const CameraTable = () => {
  // Initialize cameras and filteredCameras as empty arrays
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const loadCameras = async () => {
      try {
        const data = await fetchCameras();
        console.log(data);
        // Ensure data is an array
        if (Array.isArray(data.data)) {
          setCameras(data.data);
          setFilteredCameras(data.data);
        } else {
          // If data is not an array, set empty arrays to avoid errors
          setCameras([]);
          setFilteredCameras([]);
        }
      } catch (error) {
        console.error("Error fetching cameras:", error);
        // In case of error, set cameras and filteredCameras to empty arrays
        setCameras([]);
        setFilteredCameras([]);
      }
    };
    loadCameras();
  }, []);

  const handleFilterChange = (searchTerm, location, status) => {
    const filtered = cameras.filter((camera) => {
      const matchesSearch = camera.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLocation = location ? camera.location === location : true;
      const matchesStatus = status ? camera.status === status : true;

      return matchesSearch && matchesLocation && matchesStatus;
    });

    setFilteredCameras(filtered);
  };

  const handleDelete = (id) => {
    setFilteredCameras(filteredCameras.filter((camera) => camera.id !== id));
  };

  const handleStatusToggle = async (id, status) => {
    await updateCameraStatus(id, status);
    setFilteredCameras(
      filteredCameras.map((camera) =>
        camera.id === id ? { ...camera, status } : camera
      )
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCameras = Array.isArray(filteredCameras)
    ? filteredCameras.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEntriesChange = (newEntriesPerPage) => {
    setItemsPerPage(newEntriesPerPage);
    setCurrentPage(1); // Reset to first page when entries per page changes
  };
  console.log(currentCameras);

  return (
    <div className="table-container">
      <SearchFilter data={cameras} onFilterChange={handleFilterChange} />
      <table className="camera-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Health</th>
            <th>Location</th>
            <th>Recorder</th>
            <th>Tasks</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCameras.map((camera) => (
            <tr key={camera.id}>
              <td>{camera.name}</td>
              <td style={{ display: "flex", gap: "20px" }}>
                <PieChart name={camera.health.cloud} iconType="cloud" />
                <PieChart name={camera.health.device} iconType="device" />
              </td>
              <td>{camera.location || "N/A"}</td>
              <td>{camera.recorder || "N/A"}</td>
              <td>{camera.tasks || "N/A"}</td>
              <td>
                <span
                  onClick={() => handleStatusToggle(camera.id, camera.status)}
                  className={`status-badge ${camera.status.toLowerCase()}`}>
                  {camera.status}
                </span>
              </td>
              <td>
                <DeleteButton onDelete={() => handleDelete(camera.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalEntries={filteredCameras.length} // Pass the total number of entries
        entriesPerPageOptions={[10, 20, 50]} // Options for entries per page
        currentPage={currentPage} // Current page state
        itemsPerPage={itemsPerPage} // Current items per page
        onChangePage={handlePageChange} // Callback for page change
        onChangeEntriesPerPage={handleEntriesChange} // Callback for entries change
      />
    </div>
  );
};

export default CameraTable;
