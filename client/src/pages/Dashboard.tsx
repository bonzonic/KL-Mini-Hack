import React, { useState } from 'react';

const Dashboard = () => {
  const [addCandidateInput, setAddCandidateInput] = useState('');
  const [removeCandidateInput, setRemoveCandidateInput] = useState('');

  const handleAddCandidateClick = () => {
    // Send addCandidateInput data to the backend
    console.log('Adding candidate: ', addCandidateInput);
    addCandidate(addCandidateInput)
  };

  const handleRemoveCandidateClick = () => {
    // Send removeCandidateInput data to the backend
    console.log('Removing candidate: ', removeCandidateInput);
    removeCandidate(removeCandidateInput)
  };

  const addCandidate = async (candidate: string) => {
    const response = await fetch('http://localhost:8080/zk/addCandidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ candidate })
    });
  
    if (!response.ok) {
      throw new Error('Failed to add candidate');
    }
  
    const result = await response.text();
    return result;
  };

  const removeCandidate = async (name: string) => {
    const response = await fetch('http://localhost:8080/zk/removeCandidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
  
    if (!response.ok) {
      throw new Error('Failed to remove candidate');
    }
  
    const result = await response.text();
    return result;
  };
  
  const clearCandidates = async () => {
    const response = await fetch('http://localhost:8080/zk/clearCandidates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to clear candidates');
    }
  
    const result = await response.text();
    return result;
  };

  return (
<div className="flex justify-center mt-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-2/3 xl:w-1/2">
        <label>Add Candidate:</label>
        <input
          type="text"
          value={addCandidateInput}
          onChange={(e) => setAddCandidateInput(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddCandidateClick}
        >
          Add Candidate
        </button>
        <br />
        <label>Remove Candidate:</label>
        <input
          type="text"
          value={removeCandidateInput}
          onChange={(e) => setRemoveCandidateInput(e.target.value)}
        />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRemoveCandidateClick}
        >
          Remove Candidate
        </button>
        <br />
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={clearCandidates}>
          Clear Candidate
        </button>
      </div>
    </div>
  );
};

export default Dashboard
