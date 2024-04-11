import React, { useState } from 'react';
import Modal from 'react-modal';
import { success,error } from '../Config/toastify';
import axios  from 'axios';
import { ROOT_URL } from '../Urls';

function UpdatModal({ isOpen, closeModal, item}) {
 const [selectedItem,setSelectedItem] = useState(null);
 const [isChangeTTl,setisChangeTTl] = useState(false);
 const [newTTL,setnewTTL] = useState(false);
 const [isChangeRecord,setisChangeRecord] = useState(false);
 const [newRecord,setnewRecord]=useState(false);



 
  const handleConfirm = async () => {
    if (selectedItem !== null) {
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
        {isChangeTTl ? (<button onClick={()=>setisChangeTTl(true)}>Change TTL</button>  
      ):(
       
      )}

        </div>
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

export default UpdatModal;
