import React, { useState } from 'react';
import Modal from 'react-modal';
import { success, error } from '../Config/toastify';
import axios from 'axios';
import { ROOT_URL } from '../Urls';

function UpdateModal({ isOpen, setDelete, closeModal, item, hostedid }) {
  const [selectedItem, setSelectedItem] = useState(false);
  const [isChangeTTL, setIsChangeTTL] = useState(false);
  const [newTTL, setNewTTL] = useState('');
  const [isChangeRecord, setIsChangeRecord] = useState(false);
  const [newRecord, setNewRecord] = useState('');

  const handleConfirm = async () => {
    if (selectedItem) {
      closeModal();
      let url = `${ROOT_URL}/dns/updateExistingRecord`;

      const data = {
        type: item.Type,
        name: item.Name,
        hostedZoneId: hostedid,
        TTL: isChangeTTL ? newTTL : item.TTL,
        resourceValue: isChangeRecord ? newRecord : item.ResourceRecords[0].Value
      };

      try {
        const response = await axios.put(url, data);
        success('Record Updated');
        setDelete()
      } catch (err) {
        error("something went wrong");
        setDelete(false);
        console.error('Error:', err);
        // Handle error here, if needed
      }
    } else {
      alert("No changes Found");
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
        <h2 className="text-2xl font-bold mb-4"> Record to Update Type <span className='text-4xl text-green-800 font-semibold'>{item.Type}</span></h2>
        <p className='px-2 font-semibold text-sm'>Current Record:</p>
        <p className='font-semibold text-2xl'>TTL</p>
        <p>{item.TTL}</p>
        <p className='font-semibold text-2xl'>Record</p>
        {item && (
          <div>
            <ul>
              {item.ResourceRecords.map((record, index) => (
                <li key={index} className="flex items-center">
                  <label htmlFor={`record-${index}`}>{record.Value}</label>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <p className='px-2 font-semibold text-sm'>New Record:</p>
          <p className='font-semibold text-2xl'>TTL</p>
          {!isChangeTTL ? (
            <button onClick={() => setIsChangeTTL(true)} className='rounded-lg text-sm px-2 py-1 bg-green-300 hover:bg-green-800'>Change TTL</button>
          ) : (
            <>
              <input
                type='text'
                className=' py-4 px-1  appearance-none focus:outline-none'
                placeholder='ttl'
                value={newTTL}
                onChange={(e) => {
                  setSelectedItem(true);
                  setNewTTL(e.target.value)
                }} />
              <button onClick={() => {
                setIsChangeTTL(false);
                setNewTTL('');
                setSelectedItem(false);
              }} className='rounded-lg text-sm px-2 py-2 bg-red-600 hover:bg-red-800'>Cancel</button>
            </>
          )}
          <p className='font-semibold text-2xl'>New Record</p>
          {!isChangeRecord ? (
            <button onClick={() => setIsChangeRecord(true)} className='rounded-lg text-sm px-2 py-1 bg-green-300 hover:bg-green-800'>Change TTL</button>
          ) : (
            <>
              <input
                type='text'
                placeholder='new record'
                className=' py-4 px-1  appearance-none focus:outline-none'
                value={newRecord}
                onChange={(e) => {
                  setNewRecord(e.target.value)
                  setSelectedItem(true)
                }} />
              <button onClick={() => {
                setIsChangeRecord(false);
                setNewRecord('');
                setSelectedItem(false);
              }} className='rounded-lg text-sm px-2 py-2 bg-red-600 hover:bg-red-800'>Cancel</button>
            </>
          )}
        </div>
        <div className="flex w-64 justify-between mt-4">
          <button onClick={handleConfirm} disabled={!selectedItem} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
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

export default UpdateModal;
