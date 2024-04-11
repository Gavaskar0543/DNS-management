import React, { useState } from 'react';
import Modal from 'react-modal';
import { success,error } from '../Config/toastify';
import axios  from 'axios';
import { ROOT_URL } from '../Urls';

function UpdatModal({ isOpen, closeModal, item,hostedid}) {
 const [selectedItem,setSelectedItem] = useState(null);
 const [isChangeTTl,setisChangeTTl] = useState(false);
 const [newTTL,setnewTTL] = useState(false);
 const [isChangeRecord,setisChangeRecord] = useState(false);
 const [newRecord,setnewRecord]=useState(false);



 
  const handleConfirm = async () => {
    
        closeModal();
        let url = '';
        if(newRecord === '' && newTTL !== ''){
          url = `{ROOT_URL}/dns/updateExistingRecord?hostedZoneId=${hostedid}&TTL=${item.TTL}&resourceValue=${newRecord}&name=${item.Name}&type=${item.Type}`
        }

       if(newRecord !== '' && newTTL === ''){
          url = `{ROOT_URL}/dns/updateExistingRecord?hostedZoneId=${hostedid}&TTL=${newTTL}&resourceValue=${item.ResourceRecords[0].Value}&name=${item.Name}&type=${item.Type}`

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
        {!isChangeTTl ? (<button onClick={()=>{setisChangeTTl(true)}} className='rounded-lg text-sm px-2 py-1 bg-green-300 hover:bg-green-800'>Change TTL</button>  
      ):(
       <>
               <input type='text'
                           className=' py-4 px-1  appearance-none focus:outline-none'

               placeholder='ttl' onChange={(e)=>setnewTTL(e.target.value)}/>
               <button onClick={()=>{
                setisChangeTTl(false);
                setnewTTL('');
               }} className='rounded-lg text-sm px-2 py-2 bg-red-600 hover:bg-red-800'>Cancel</button>

       </>
      )}
              <p className='font-semibold text-2xl'>New Record</p>

{!isChangeRecord ? (<button onClick={()=>{setisChangeRecord(true)}} className='rounded-lg text-sm px-2 py-1 bg-green-300 hover:bg-green-800'>Change TTL</button>  
      ):(
       <>
               <input type='text' placeholder='new record'
                           className=' py-4 px-1  appearance-none focus:outline-none'

               onChange={(e)=>setnewRecord(e.target.value)}/>
               <button onClick={()=>{
                setisChangeRecord(false);
                setnewRecord('');
               }} className='rounded-lg text-sm px-2 py-2 bg-red-600 hover:bg-red-800'>Cancel</button>

       </>
      )}

        </div>
       
        <div className="flex w-64 justify-between mt-4">
        <button onClick={handleConfirm}  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
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
