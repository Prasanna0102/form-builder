import React, { useState } from 'react';

const ServiceSelection = ({ onServiceSelect }: { onServiceSelect: (serviceTitle: string) => void }) => {
  const [serviceTitle, setServiceTitle] = useState('');

  const handleFetchForm = () => {
    if (serviceTitle) {
      onServiceSelect(serviceTitle); // Pass selected service title to parent component
    }
  };

  return (
    <div>
      <h2>Select a Service</h2>
      <input
        type="text"
        value={serviceTitle}
        onChange={(e) => setServiceTitle(e.target.value)}
        placeholder="Enter service title"
      />
      <button onClick={handleFetchForm}>Fetch Form</button>
    </div>
  );
};

export default ServiceSelection;
