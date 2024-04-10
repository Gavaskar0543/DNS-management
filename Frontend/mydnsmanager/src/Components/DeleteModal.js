import React, { useState } from 'react';
import Modal from 'react-modal';

function DeleteModal({ isOpen, closeModal, item, setconfirm,setmydnsrecord ,mydnsrecord}) {
 const [selectedItem,setSelectedItem] = useState(null);

  const handleRadioChange = (index,record) => {
    setSelectedItem(index);
    setmydnsrecord(record.Value)
  };

  const handleConfirm = () => {
    if (selectedItem !== null) {
        setconfirm(true)
      closeModal();
    } else {
      // Optionally, provide feedback to the user if no item is selected
      alert('Please select a record before confirming.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="modal"
    >
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Select Record to Delete</h2>
        {item && (
          <div>
            <ul>
              {item.ResourceRecords.map((record, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`record-${index}`}
                    className="mr-2"
                    checked={selectedItem === index}
                    onChange={() => handleRadioChange(index,record)}
                  />
                  <label htmlFor={`record-${index}`}>{record.Value}</label>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex w-64 justify-between mt-4">
        <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Confirm
          </button>
          <button onClick={closeModal} className="bg-red-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-red-300">
            Close Modal
          </button>
         
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
