import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import GoBack from '../assets/select.svg'
import Delete from '../assets/delete.svg'
import useDataStore from "../store/useDataStore";

function Details() {
  const { id } = useParams();
  const { data, deleteData, updateData } = useDataStore()
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [detail, setDetail] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      const foundItem = data.find(item => String(item.id) === String(id));
      setDetail(foundItem || null);
    }
  }, [id, data]);

  function handleChange(index, field, value) {
    setDetail((prev) => {
      if (!prev || !prev.items) return prev;

      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };

      if (field === "quantity" || field === "price") {
        newItems[index].total = (newItems[index].quantity || 0) * (newItems[index].price || 0);
      }

      return { ...prev, items: newItems };
    });
  }

  function markAsPaid() {
    setDetail((data) => {
      const updatedData = { ...data, status: "paid" };
      const storedData = JSON.parse(localStorage.getItem("data"));
      const newData = storedData.map((item) =>
        item.id == updatedData.id ? updatedData : item
      );
      localStorage.setItem("data", JSON.stringify(newData));
      return updatedData;
    });
  }

  function addBoxFun() {
    setBoxes([...boxes, boxes.length + 1]);
  }

  function deleteBox(id) {
    setBoxes(boxes.filter((box) => box !== id));
  };

  function handleDeleteInvoices(id) {
    deleteData(id);
    navigate('/')
  }

  function openModal(item) {
    setSelectedItem(item);
    setModal(true);
  };

  function handleSaveChanges() {
    if (selectedItem) {
      updateData(selectedItem.id, selectedItem);
    }
    setModal(false);
  };

  function addBoxFun() {
    setSelectedItem((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { name: "", quantity: 1, price: "", total: 0 }
      ],
    }));
  }

  function deleteBox(idx) {
    setSelectedItem((prev) => ({
      ...prev,
      items: prev.items.filter((_, index) => index !== idx),
    }));
  }

  return (
    <>
      {
        deleteModal && (
          <div className='top-0 left-0 z-50 fixed flex justify-center items-center w-full h-screen'>
            <div onClick={() => { setDeleteModal(false) }} className='fixed bg-black opacity-[49.84%] w-full h-screen'></div>
            <div className='z-[110] flex flex-col bg-white dark:bg-[#1E2139] p-[32px] rounded-[8px] w-full max-w-[327px] md:max-w-[408px]'>
              <h3 className='font-bold text-[#0C0E16] text-[20px] dark:text-white'>Confirm Deletion</h3>
              <p className='mt-[8px] mb-[24px] font-normal text-[#888EB0] text-[12px]'>Are you sure you want to delete invoice #XM9141? This action cannot be undone.</p>
              <div className='flex justify-end gap-[8px]'>
                <button className='bg-[#F9FAFE] dark:bg-[#252945] px-[24px] py-[17px] rounded-[24px] font-bold text-[#7E88C3] text-[12px] active:scale-95 transition-[0.3s]' onClick={() => { setDeleteModal(false) }}>Cancel</button>
                <button onClick={() => { handleDeleteInvoices(detail.id) }} className='bg-[#EC5757] px-[24px] py-[17px] rounded-[24px] font-bold text-[12px] text-white active:scale-95 transition-[0.3s]'>Delete</button>
              </div>
            </div>
          </div>
        )
      }
      {
        modal && (
          <div>
            <div onClick={() => { setModal(false) }} className='top-0 left-0 z-40 fixed bg-black opacity-[49.84%] w-full h-screen'></div>
            <div className='top-[70px] md:top-[80px] lg:top-0 left-0 lg:left-[103px] z-40 fixed bg-white dark:bg-[#141625] px-[24px] pt-[32px] pb-[208px] lg:pb-[150px] w-screen md:w-full md:max-w-[616px] h-screen overflow-y-auto animate-slideIn scroll-auto'>
              <button onClick={() => { setModal(false) }} className='flex items-center gap-[24px] font-bold text-[#0C0E16] text-[12px] dark:text-white'><img className='rotate-[90deg]' src={GoBack} /> Go back</button>
              <h3 className="my-[24px] font-bold text-[#0C0E16] text-[24px] dark:text-white">Edit <span className='text-[#888EB0]'>#</span>{detail.id}</h3>
              <p className="mb-[24px] font-bold text-[#7C5DFA] text-[12px]">Bill From</p>
              <div className="flex flex-col mb-[40px]">
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="streetAddress1">Street Address
                  <input onChange={(e) => {
                    setSelectedItem({ ...selectedItem, senderAddress: { ...selectedItem.senderAddress, street: e.target.value } })
                  }} value={selectedItem.senderAddress.street} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="streetAddress1" />
                </label>
                <div className="md:flex md:items-center gap-[24px]">
                  <div className="flex gap-[23px] md:gap-[24px] my-[24px] w-full">
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="city1">City
                      <input onChange={(e) => {
                        setSelectedItem({ ...selectedItem, senderAddress: { ...selectedItem.senderAddress, city: e.target.value } })
                      }} value={selectedItem.senderAddress.city} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="city1" />
                    </label>
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="postCode1">Post Code
                      <input onChange={(e) => {
                        setSelectedItem({ ...selectedItem, senderAddress: { ...selectedItem.senderAddress, postCode: e.target.value } })
                      }} value={selectedItem.senderAddress.postCode} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="postCode1" />
                    </label>
                  </div>
                  <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="country1">Country
                    <input onChange={(e) => {
                      setSelectedItem({ ...selectedItem, senderAddress: { ...selectedItem.senderAddress, country: e.target.value } })
                    }} value={selectedItem.senderAddress.country} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="country1" />
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-[24px]">
                <p className="font-bold text-[#7C5DFA] text-[12px]">Bill To</p>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="name">Client’s Name
                  <input onChange={(e) => { setSelectedItem({ ...selectedItem, clientName: e.target.value }) }} value={selectedItem.clientName} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="name" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="email">Client’s Email
                  <input onChange={(e) => { setSelectedItem({ ...selectedItem, clientEmail: e.target.value }) }} value={selectedItem.clientEmail} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="email" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="streetAddress2">Street Address
                  <input onChange={(e) => {
                    setSelectedItem({ ...selectedItem, clientAddress: { ...selectedItem.clientAddress, street: e.target.value } })
                  }} value={selectedItem.clientAddress.street} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="streetAddress2" />
                </label>
                <div className="flex md:flex-row flex-col gap-[24px] mb-[24px]">
                  <div className="flex gap-[24px] w-full">
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="city2">City
                      <input onChange={(e) => {
                        setSelectedItem({ ...selectedItem, clientAddress: { ...selectedItem.clientAddress, city: e.target.value } })
                      }} value={selectedItem.clientAddress.city} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="city2" />
                    </label>
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="postCode2">Post Code
                      <input onChange={(e) => {
                        setSelectedItem({ ...selectedItem, clientAddress: { ...selectedItem.clientAddress, postCode: e.target.value } })
                      }} value={selectedItem.clientAddress.postCode} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="postCode2" />
                    </label>
                  </div>
                  <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="country2">Country
                    <input onChange={(e) => {
                      setSelectedItem({ ...selectedItem, clientAddress: { ...selectedItem.clientAddress, country: e.target.value } })
                    }} value={selectedItem.clientAddress.country} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="country2" />
                  </label>
                </div>
                <div className="flex flex-col gap-[24px] mt-[18px]">
                  <div className="flex md:flex-row flex-col gap-[24px]">
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="invoiceDate">Invoice Date
                      <input onChange={(e) => { setSelectedItem({ ...selectedItem, createdAt: e.target.value }) }} value={selectedItem.createdAt} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="date" id="invoiceDate" />
                    </label>
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="select">Payment Terms
                      <select onChange={(e) => { setSelectedItem({ ...selectedItem, paymentTerms: e.target.value }) }} value={selectedItem.paymentTerms} id="select" className="bg-white dark:bg-[#1E2139] px-[20px] border border-gray-300 dark:border-[#252945] rounded-md w-full h-[48px] text-[#7E88C3] text-[12px] dark:text-[#888EB0]">
                        <option value="Next 1 day">Next 1 day</option>
                        <option value="Next 7 day">Next 7 day</option>
                        <option value="Next 14 day">Next 14 day</option>
                        <option value="Next 30 day">Next 30 day</option>
                      </select>
                    </label>
                  </div>
                  <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="projectDescription2">Project Description
                    <input onChange={(e) => { setSelectedItem({ ...selectedItem, description: e.target.value }) }} value={selectedItem.description} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="projectDescription2" />
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-[48px] md:gap-[18px] mt-[50px]">
                <h4 className="mt-[24px] font-bold text-[#777F98] text-[18px]">Item List</h4>
                {selectedItem.items.map((val, idx) => (
                  <div className="flex md:flex-row flex-col items-end gap-[24px] md:gap-[18px]" key={idx}>
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]">Item Name
                      <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white" type="text" value={val.name} onChange={(e) => handleChange(idx, "name", e.target.value)} />
                    </label>
                    <div className="flex items-center gap-[16px]">
                      <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]"> Qty.
                        <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white" type="number" value={val.quantity} onChange={(e) => handleChange(idx, "quantity", Number(e.target.value))} />
                      </label>
                      <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]"> Price
                        <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white" type="number" value={val.price} onChange={(e) => handleChange(idx, "price", Number(e.target.value))} />
                      </label>
                      <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]"> Total
                        <input disabled className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white" type="text" value={val.total.toFixed(2)} />
                      </label>
                      <img onClick={() => deleteBox(idx)} src={Delete} className="w-[13px] cursor-pointer" alt="Delete" />
                    </div>
                  </div>
                ))}
                <button onClick={addBoxFun} className="bg-[#F9FAFE] dark:bg-[#252945] py-[17px] rounded-[24px] font-bold text-[#7E88C3] text-[12px] dark:text-[#888EB0]" > + Add New Item </button>
              </div>
            </div>
            <div className="bottom-0 left-0 lg:left-[73px] z-40 fixed flex justify-end gap-[5px] bg-white dark:bg-[#1E2139] px-[24px] py-[22px] md:pl-[50px] w-full md:max-w-[616px] lg:md:max-w-[646px] overflow-hidden animate-slideIn">
              <button onClick={() => { setModal(false) }} className="bg-[#F9FAFE] dark:bg-[#252945] px-[16px] py-[17px] rounded-[24px] font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA] active:scale-95 transition-[0.3s]">Cancel</button>
              <button onClick={handleSaveChanges} className="bg-[#7C5DFA] px-[16px] py-[17px] rounded-[24px] font-bold text-[12px] text-white active:scale-95 transition-[0.3s]">Save Changes</button>
            </div>
          </div>
        )
      }
      <div className='mt-[8px]'>
        <div className='flex flex-col'>
          <button onClick={() => { navigate(-1) }} className='flex items-center gap-[24px] font-bold text-[#0C0E16] text-[12px] dark:text-white'><img className='rotate-[90deg]' src={GoBack} /> Go back</button>
          <div className='flex justify-between bg-white dark:bg-[#1E2139] mt-[32px] mb-[16px] p-[24px] lg:px-[32px] lg:py-[20px] rounded-[8px]'>
            <div className='flex justify-between items-center gap-[16px] w-full md:max-w-[160px]'>
              <h2 className='font-normal text-[#858BB2] text-[12px] dark:text-[#DFE3FA]'>Status</h2>
              <button className={`gap-[8px] font-bold flex items-center justify-center px-[18px] py-[13px] rounded-[6px] ${detail?.status == 'paid' ? 'text-[#33D69F] bg-[#F3FCF9] dark:bg-[#1F2B3F]' : detail?.status == 'pending' ? 'text-[#FF8F00] dark:bg-[#2B2736] bg-[#FFF8F0]' : 'text-[#373B53] dark:bg-[#292C44] dark:text-[#DFE3FA] bg-[#F3F3F5]'} capitalize`}><span className={`inline-block w-[8px] h-[8px] rounded-full ${detail?.status == 'paid' ? 'bg-[#33D69F]' : detail?.status == 'pending' ? 'bg-[#FF8F00]' : 'bg-[#373B53] dark:bg-[#DFE3FA]'}`}></span>{detail?.status}</button>
            </div>
            <div className='bottom-0 left-0 z-30 md:static fixed flex justify-end gap-[8px] bg-white dark:bg-[#1E2139] md:p-0 px-[24px] py-[22px] ring-0 w-full md:max-w-[370px]'>
              <button onClick={() => { openModal(detail) }} className='bg-[#F9FAFE] dark:bg-[#252945] px-[23px] py-[17px] rounded-[24px] font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA] active:scale-95 transition-[0.3s]'>Edit</button>
              <button onClick={() => { setDeleteModal(true) }} className='bg-[#EC5757] px-[23px] py-[17px] rounded-[24px] font-bold text-[12px] text-white active:scale-95 transition-[0.3s]'>Delete</button>
              <button onClick={markAsPaid} className={`bg-[#7C5DFA] px-[27px] py-[17px] rounded-[24px] font-bold text-[12px] text-white active:scale-95 transition-[0.3s] ${detail?.status == 'paid' ? 'hidden' : detail?.status == 'draft' ? 'hidden' : 'block'}`}>Mark as Paid</button>
            </div>
          </div>
        </div>
        <div className='bg-white dark:bg-[#1E2139] mb-[100px] md:mb-[50px] p-[24px] rounded-[8px]'>
          <div className='flex sm:flex-row flex-col sm:justify-between gap-[30px]'>
            <div className='flex flex-col gap-[4px]'>
              <h3 className='font-bold text-[#0C0E16] text-[12px] dark:text-white'><span className='text-[#7E88C3] dark:text-[#7E88C3]'>#</span>{detail?.id}</h3>
              <p className='font-normal text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>{detail?.description}</p>
            </div>
            <ul className='flex flex-col items-start sm:items-end font-normal text-[#7E88C3] text-[11px] dark:text-[#DFE3FA]'>
              <li>{detail?.senderAddress?.street}</li>
              <li>{detail?.senderAddress?.city}</li>
              <li>{detail?.senderAddress?.postCode}</li>
              <li>{detail?.senderAddress?.country}</li>
            </ul>
          </div>
          <div className='flex flex-wrap gap-[41px] sm:gap-[70px] md:gap-[110px] mt-[31px] md:mt-[21px]'>
            <div className='flex flex-col gap-[32px]'>
              <div className='flex flex-col items-start gap-[12px]'>
                <p className='font-normal text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>Invoice Date</p>
                <h4 className='font-bold text-[#0C0E16] text-[15px] dark:text-white'>{new Date(detail?.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</h4>
              </div>
              <div className='flex flex-col items-start gap-[12px]'>
                <p className='font-normal text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>Payment Due</p>
                <h4 className='font-bold text-[#0C0E16] text-[15px] dark:text-white'>{new Date(detail?.paymentDue).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</h4>
              </div>
            </div>
            <div className='flex flex-col gap-[12px]'>
              <p className='font-normal text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>Bill To</p>
              <h4 className='font-bold text-[#0C0E16] text-[15px] dark:text-white'>{detail?.clientName}</h4>
              <ul className='font-normal text-[#7E88C3 text-[#7E88C3] text-[11px] dark:text-[#DFE3FA]'>
                <li>{detail?.clientAddress?.street}</li>
                <li>{detail?.clientAddress?.city}</li>
                <li>{detail?.clientAddress?.postCode}</li>
                <li>{detail?.clientAddress?.country}</li>
              </ul>
            </div>
            <div>
              <p className='font-normal text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>Sent to</p>
              <h4 className='font-bold text-[#0C0E16] text-[15px] dark:text-white'>{detail?.clientEmail}</h4>
            </div>
          </div>
          <div className='flex flex-col mt-[40px]'>
            <div className='flex flex-col gap-[24px] bg-[#F9FAFE] dark:bg-[#252945] p-[24px] md:p-[32px] rounded-t-[8px]'>
              <div className='hidden md:flex justify-between items-center font-normal text-[#7E88C3] text-[11px] dark:text-[#DFE3FA]'>
                <p>Item Name</p>
                <div className='flex justify-between items-center w-full max-w-[290px]'>
                  <p>QTY.</p>
                  <p>Price</p>
                  <p>Total</p>
                </div>
              </div>
              {
                detail?.items && detail?.items.map((val, idx) => (
                  <div key={idx}>
                    <div className='md:hidden flex justify-between items-center'>
                      <div className='flex flex-col gap-[8px]'>
                        <h6 className='font-bold text-[#0C0E16] text-[12px] dark:text-white'>{val?.name}</h6>
                        <p className='font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>{val.quantity} x £ {val?.price.toFixed(2)}</p>
                      </div>
                      <p className='font-bold text-[#0C0E16] text-[12px] dark:text-white'>£{val?.total.toFixed(2)}</p>
                    </div>
                    <div className='hidden md:flex justify-between items-center'>
                      <h6 className='font-bold text-[#0C0E16] text-[12px] dark:text-white'>{val?.name}</h6>
                      <div className='flex justify-between w-full max-w-[278px]'>
                        <p className='font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>{val?.quantity}</p>
                        <p className='font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>£{val?.price.toFixed(2)}</p>
                        <p className='font-bold text-[#0C0E16] text-[12px] dark:text-[#DFE3FA]'>£{val?.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='flex justify-between items-center bg-[#373B53] dark:bg-[#0C0E16] p-[24px] rounded-b-[8px] text-white'>
              <h5 className='font-normal text-[11px]'>Grand Total</h5>
              <h3 className='font-bold text-[20px]'>£{detail?.items?.reduce((sum, item) => sum + (item.total || 0), 0).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(Details);