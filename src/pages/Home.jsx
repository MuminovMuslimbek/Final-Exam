import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BtnImgPlus from "../assets/btnIconPlus.svg";
import EmptyData from "../assets/EmptyData.png";
import SelectIcon from "../assets/select.svg";
import GoInDetail from '../assets/goInDetail.svg'
import DataJson from '../assets/data.json'
import GoBack from '../assets/select.svg'
import Delete from '../assets/delete.svg'
import useDataStore from "../store/useDataStore";

function Home() {
  const [count, setCount] = useState(0);
  const { data, setData, addData } = useDataStore();
  const [isDropdown, setIsDropdown] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [modal, setModal] = useState(false)
  const [streetAddress, setStreetAddress] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [fromPostCode, setFromPostCode] = useState('')
  const [fromCountry, setFromCountry] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [toStreetAddress, setToStreetAddress] = useState('')
  const [toCity, setToCity] = useState('')
  const [toPostCode, setToPostCode] = useState('')
  const [toCountry, setToCountry] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [paymentTerms, setPaymentTerms] = useState('Next 1 day')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const [boxes, setBoxes] = useState([
    {
      name: "",
      quantity: 1,
      price: '',
      total: 0,
    },
  ]);

  const filter = ["Paid", "Pending", "Draft"];

  const transition = { duration: 0.3, ease: "easeInOut" };

  const variants = {
    open: { opacity: 1, y: 0, transition },
    close: { opacity: 0, y: -10, transition },
  };

  useEffect(() => {
    let storedData = JSON.parse(localStorage.getItem('data'));

    if (!storedData) {
      localStorage.setItem('data', JSON.stringify(DataJson));
      storedData = DataJson;
    }

    if (filterValue !== '') {
      let valFil = filterValue.toLowerCase();
      setData(storedData.filter((el) => el.status.toLowerCase() === valFil));
    } else {
      setData(storedData);
    }
  }, [filterValue]);

  function handleChange(index, field, value) {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box, idx) => {
        if (idx === index) {
          const updatedBox = { ...box, [field]: value };
          if (field === "quantity" || field === "price") {
            updatedBox.total = (updatedBox.quantity * updatedBox.price).toFixed(2);
          }

          return updatedBox;
        }
        return box;
      })
    );
  }

  useEffect(() => {
    if (data.length) {
      setCount(data.length);
    }
  }, [data]);

  function addBoxFun() {
    const newItem = {
      name: "",
      quantity: 1,
      price: '',
      total: 0,
    };
    setBoxes([...boxes, newItem]);
  }

  function deleteBox(id) {
    setBoxes((prBox) => prBox.filter((_, idx) => idx !== id));
  }

  function formatDate(dateStr) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-GB', options).replace(',', '');
  };

  function handleRedirec(id) {
    navigate(`/${id}`)
  }

   const validateForm = () => {
    for (let i = 0; i < boxes.length; i++) {
      const { name, quantity, price } = boxes[i];

      if (!name.trim()) {
        alert(`${i + 1}-qator: Item Name kiritilishi shart!`);
        return false;
      }
      if (quantity <= 0) {
        alert(`${i + 1}-qator: Quantity 1 yoki undan katta bo‘lishi kerak!`);
        return false;
      }
      if (price < 0) {
        alert(`${i + 1}-qator: Price manfiy bo‘lishi mumkin emas!`);
        return false;
      }
    }
    return true;
  };

  function validate() {
    if (!streetAddress) {
      alert('streetAddress ni kiritmadingiz')
      return false
    }
    if (!fromCity) {
      alert('fromCity ni kiritmadingiz')
      return false
    }
    if (!fromPostCode) {
      alert('fromPostCode ni kiritmadingiz')
      return false
    }
    if (!fromCountry) {
      alert('fromCountry ni kiritmadingiz')
      return false
    }
    if (!clientName) {
      alert('clientName ni kiritmadingiz')
      return false
    }
    if (!clientEmail) {
      alert('clientEmail ni kiritmadingiz')
      return false
    }
    if (!toStreetAddress) {
      alert('toStreetAddress ni kiritmadingiz')
      return false
    }
    if (!toCity) {
      alert('toCityni kiritmadingiz')
      return false
    }
    if (!toPostCode) {
      alert('toPostCode ni kiritmadingiz')
      return false
    }
    if (!toCountry) {
      alert('toCountry ni kiritmadingiz')
      return false
    }
    if (!invoiceDate) {
      alert('invoiceDate ni kiritmadingiz')
      return false
    }
    if (!paymentTerms) {
      alert('paymentTerms ni kiritmadingiz')
      return false
    }
    if (!description) {
      alert('description ni kiritmadingiz')
      return false
    }
    if (!validateForm()) {
      return false
    }
    return true
  }

  function handleAddNewCard(arg) {

    let isValid = validate()
    if (!isValid) {
      return
    }

    const time = new Date();
    const terms = paymentTerms.match(/\d+/)?.[0] || 1
    const totalSum = boxes.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
    const paymentDue = new Date(time.setDate(time.getDate() + parseInt(terms))).toISOString().split('T')[0];

    let data = {
      "id": Date.now(),
      "createdAt": invoiceDate,
      "paymentDue": paymentDue,
      "description": description,
      "paymentTerms": parseInt(terms),
      "clientName": clientName,
      "clientEmail": clientEmail,
      "status": arg == 'pending' ? 'pending' : 'draft',
      "senderAddress": {
        "street": streetAddress,
        "city": fromCity,
        "postCode": fromPostCode,
        "country": fromCountry
      },
      "clientAddress": {
        "street": toStreetAddress,
        "city": toCity,
        "postCode": toPostCode,
        "country": toCountry
      },
      "items": boxes.map(box => ({
        "name": box.name,
        "quantity": box.quantity,
        "price": box.price,
        "total": box.quantity * box.price
      })),
      "total": totalSum
    }
    addData(data);
    setModal(false)
  }

  return (
    <div>
      {
        modal && (
          <div>
            <div onClick={() => { setModal(false) }} className='top-0 left-0 z-40 fixed bg-black opacity-[49.84%] w-full h-screen'></div>
            <div className='top-[70px] md:top-[80px] lg:top-0 left-0 lg:left-[103px] z-40 fixed bg-white dark:bg-[#141625] px-[24px] pt-[32px] pb-[208px] lg:pb-[150px] w-screen md:w-full md:max-w-[616px] h-screen overflow-y-auto animate-slideIn scroll-auto'>
              <button onClick={() => { setModal(false) }} className='flex items-center gap-[24px] font-bold text-[#0C0E16] text-[12px] dark:text-white'><img className='rotate-[90deg]' src={GoBack} /> Go back</button>
              <h3 className="my-[24px] font-bold text-[#0C0E16] text-[24px] dark:text-white">New Invoice</h3>
              <p className="mb-[24px] font-bold text-[#7C5DFA] text-[12px]">Bill From</p>
              <div className="flex flex-col mb-[40px]">
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="streetAddress1">Street Address
                  <input value={streetAddress} onChange={(e) => { setStreetAddress(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="streetAddress1" />
                </label>
                <div className="md:flex md:items-center gap-[24px]">
                  <div className="flex gap-[23px] md:gap-[24px] my-[24px] w-full">
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="city1">City
                      <input value={fromCity} onChange={(e) => { setFromCity(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="city1" />
                    </label>
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="postCode1">Post Code
                      <input value={fromPostCode} onChange={(e) => { setFromPostCode(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="postCode1" />
                    </label>
                  </div>
                  <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="country1">Country
                    <input value={fromCountry} onChange={(e) => { setFromCountry(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="country1" />
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-[24px]">
                <p className="font-bold text-[#7C5DFA] text-[12px]">Bill To</p>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="name">Client’s Name
                  <input value={clientName} onChange={(e) => { setClientName(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="name" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="email">Client’s Email
                  <input value={clientEmail} onChange={(e) => { setClientEmail(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="email" id="email" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="streetAddress2">Street Address
                  <input value={toStreetAddress} onChange={(e) => { setToStreetAddress(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="" id="streetAddress2" />
                </label>
                <div className="flex md:flex-row flex-col gap-[24px] mb-[24px]">
                  <div className="flex gap-[24px] w-full">
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="city2">City
                      <input value={toCity} onChange={(e) => { setToCity(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="city2" />
                    </label>
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="postCode2">Post Code
                      <input value={toPostCode} onChange={(e) => { setToPostCode(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="postCode2" />
                    </label>
                  </div>
                  <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="country2">Country
                    <input value={toCountry} onChange={(e) => { setToCountry(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="country2" />
                  </label>
                </div>
                <div className="flex flex-col gap-[24px] mt-[18px]">
                  <div className="flex md:flex-row flex-col gap-[24px]">
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="invoiceDate">Invoice Date
                      <input value={invoiceDate} onChange={(e) => { setInvoiceDate(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="date" id="invoiceDate" />
                    </label>
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="select">Payment Terms
                      <select value={paymentTerms} onChange={(e) => { setPaymentTerms(e.target.value) }} id="select" className="bg-white dark:bg-[#1E2139] px-[20px] border border-gray-300 dark:border-[#252945] rounded-md w-full h-[48px] text-[#7E88C3] text-[12px] dark:text-[#888EB0]">
                        <option value="Next 1 day">Next 1 day</option>
                        <option value="Next 7 day">Next 7 day</option>
                        <option value="Next 14 day">Next 14 day</option>
                        <option value="Next 30 day">Next 30 day</option>
                      </select>
                    </label>
                  </div>
                  <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="projectDescription2">Project Description
                    <input value={description} onChange={(e) => { setDescription(e.target.value) }} className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="projectDescription2" />
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-[48px] md:gap-[18px] mt-[50px]">
                <h4 className="mt-[24px] font-bold text-[#777F98] text-[18px]">Item List</h4>
                {boxes.map((val, idx) => (
                  <div className="flex md:flex-row flex-col items-end gap-[24px] md:gap-[18px]" key={idx}>
                    <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]">
                      Item Name
                      <input
                        className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white"
                        type="text"
                        value={val.name}
                        onChange={(e) => handleChange(idx, "name", e.target.value)}
                      />
                    </label>
                    <div className="flex items-center gap-[16px]">
                      <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]">
                        Qty.
                        <input
                          className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white"
                          type="number"
                          value={val.quantity}
                          onChange={(e) => handleChange(idx, "quantity", parseFloat(e.target.value) || 0)}
                        />
                      </label>
                      <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]">
                        Price
                        <input
                          className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-[#7C5DFA] w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white"
                          type="number"
                          value={val.price}
                          onChange={(e) => handleChange(idx, "price", parseFloat(e.target.value) || 0)}
                        />
                      </label>
                      <label className="flex flex-col gap-[10px] w-full font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]">
                        Total
                        <input
                          disabled
                          className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] outline-none w-full h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white"
                          type="text"
                          value={val.total}
                        />
                      </label>
                      <img
                        onClick={() => deleteBox(idx)}
                        src={Delete}
                        className="w-[13px] cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
                <button className="bg-[#F9FAFE] dark:bg-[#252945] py-[17px] rounded-[24px] font-bold text-[#7E88C3] text-[12px] dark:text-[#888EB0]" onClick={addBoxFun}>
                  + Add New Item
                </button>
              </div>
            </div>
            <div className="bottom-0 left-0 lg:left-[73px] z-[45] fixed flex justify-between gap-[5px] bg-white dark:bg-[#1E2139] px-[24px] py-[22px] md:pl-[50px] w-full md:max-w-[616px] lg:md:max-w-[646px] overflow-hidden animate-slideIn">
              <button onClick={() => { setModal(false) }} className="bg-[#F9FAFE] dark:bg-[#252945] px-[16px] py-[17px] rounded-[24px] font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA] active:scale-95 transition-[0.3s]">Discard</button>
              <div className="flex gap-[8px]">
                <button onClick={() => { handleAddNewCard('draft') }} className="bg-[#373B53] px-[16px] py-[17px] rounded-[24px] font-bold text-[#888EB0] text-[12px] dark:text-[#DFE3FA] active:scale-95 transition-[0.3s]">Save as Draft</button>
                <button onClick={() => { handleAddNewCard('pending') }} className="bg-[#7C5DFA] px-[16px] py-[17px] rounded-[24px] font-bold text-[12px] text-white active:scale-95 transition-[0.3s]">Save & Send</button>
              </div>
            </div>
          </div>
        )
      }
      <nav className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start gap-[4px] md:gap-[8px]">
          <h1 className="font-bold text-[#0C0E16] text-[20px] md:text-[32px] dark:text-white"> Invoices </h1>
          <p className="md:hidden font-normal text-[#888EB0] text-[12px] dark:text-[#DFE3FA]"> {count} invoices </p>
          <p className="hidden md:block font-normal text-[#888EB0] text-[12px] dark:text-[#DFE3FA]"> There are {count} pending invoices</p>
        </div>
        <div className="flex items-center gap-[18px]">
          <div className="flex items-center cursor-pointer" onClick={() => setIsDropdown((prev) => !prev)}>
            <p className="hidden md:block font-medium dark:text-white"> Filter by status </p>
            <p className="md:hidden font-medium dark:text-white">Filter</p>
            <div className="ml-3 cursor-pointer" >
              <motion.img src={SelectIcon} animate={isDropdown ? { rotate: -180 } : { rotate: 0 }} transition={transition} />
            </div>
          </div>
          {isDropdown && (
            <motion.div initial="close" animate="open" exit="close" variants={variants} className="top-[160px] lg:top-[120px] absolute flex flex-col space-y-2 bg-white dark:bg-[#1E2139] shadow-2xl px-6 py-4 rounded-xl w-40 dark:text-white" >
              {filter.map((item, i) => (
                <div key={i} onClick={() => setFilterValue((prev) => (prev === item ? "" : item))} className="flex items-center space-x-2 cursor-pointer" >
                  <input type="checkbox" checked={filterValue === item} className="accent-[#7c5dfa] hover:accent-[#7c5dfa]" readOnly />
                  <p>{item}</p>
                </div>
              ))}
            </motion.div>
          )}
          <button onClick={() => { setModal(true) }} className="md:hidden flex items-center gap-[8px] bg-[#7C5DFA] p-[6px] pr-[14px] rounded-[24px] text-[12px] text-white active:scale-95 transition-[0.3s]"> <img src={BtnImgPlus} alt="New" /> New </button>
          <button onClick={() => { setModal(true) }} className="hidden md:flex items-center gap-[8px] bg-[#7C5DFA] p-[6px] pr-[14px] rounded-[24px] text-[12px] text-white active:scale-95 transition-[0.3s]"> <img src={BtnImgPlus} alt="New" /> New Invoice </button>
        </div>
      </nav>
      {data.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-[102px]">
          <div className="flex flex-col mx-auto max-w-[235px] text-center">
            <img src={EmptyData} className="mx-2" alt="No Data" />
            <h3 className="mt-[64px] font-bold text-[#0C0E16] text-[20px] dark:text-white"> There is nothing here
            </h3>
            <p className="mt-[24px] font-normal text-[#888EB0] text-[12px] dark:text-white"> Create a new invoice by clicking the{" "}
              <span className="font-bold">New Invoice</span> button and get started
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[16px] py-[32px]">
          {
            data.map((val, idx) => (
              <div key={idx} onClick={() => { handleRedirec(val.id) }} className="translate-[0.3s]">
                <div className="md:hidden flex flex-col gap-[24px] bg-white dark:bg-[#1E2139] p-[24px] rounded-[8px]">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-[#0C0E16] text-[12px] dark:text-white"> <span className="text-[#7E88C3]">#</span>{val.id}</h4>
                    <p className="font-normal text-[#858BB2] text-[12px] dark:text-white">{val.clientName}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-[8px]">
                      <h5 className="font-normal text-[#858BB2] text-[12px] dark:text-[#DFE3FA]">Due {formatDate(val.paymentDue)}</h5>
                      <p className="font-bold text-[#0C0E16] text-[16px] dark:text-white">£{val.total.toFixed(2)}</p>
                    </div>
                    <button className={`gap-[8px] font-bold flex items-center px-[18px] py-[13px] rounded-[6px] ${val.status == 'paid' ? 'text-[#33D69F] bg-[#F3FCF9] dark:bg-[#1F2B3F]' : val.status == 'pending' ? 'text-[#FF8F00] dark:bg-[#2B2736] bg-[#FFF8F0]' : 'text-[#373B53] dark:text-[#DFE3FA] bg-[#F3F3F5] dark:bg-[#292C44]'} capitalize`}><span className={`inline-block w-[8px] h-[8px] rounded-full ${val.status == 'paid' ? 'bg-[#33D69F]' : val.status == 'pending' ? 'bg-[#FF8F00]' : 'bg-[#373B53] dark:bg-[#DFE3FA]'}`}></span>{val.status}</button>
                  </div>
                </div>
                <div className="hidden md:flex justify-between items-center gap-[30px] bg-white dark:bg-[#1E2139] px-[24px] py-[16px] hover:border-[#7C5DFA] hover:border-[1px] rounded-[8px] cursor-pointer">
                  <div className="flex justify-between items-center w-full">
                    <h4 className="font-bold text-[#0C0E16] text-[12px] dark:text-white"> <span className="text-[#7E88C3]">#</span>{val.id}</h4>
                    <h5 className="font-normal text-[#858BB2] text-[12px] dark:text-[#DFE3FA]">Due {formatDate(val.paymentDue)}</h5>
                    <p className="font-normal text-[#858BB2] text-[12px] dark:text-white">{val.clientName}</p>
                    <p className="font-bold text-[#0C0E16] text-[16px] dark:text-white">£{val.total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center gap-[20px] w-full max-w-[155px]">
                    <button className={`gap-[8px] w-full font-bold flex items-center justify-center px-[18px] py-[13px] rounded-[6px] ${val.status == 'paid' ? 'text-[#33D69F] dark:bg-[#1F2B3F] bg-[#F3FCF9]' : val.status == 'pending' ? 'text-[#FF8F00] dark:bg-[#2B2736] bg-[#FFF8F0]' : 'text-[#373B53] dark:text-[#DFE3FA] bg-[#F3F3F5] dark:bg-[#292C44]'} capitalize`}><span className={`inline-block w-[8px] h-[8px] rounded-full ${val.status == 'paid' ? 'bg-[#33D69F]' : val.status == 'pending' ? 'bg-[#FF8F00]' : 'bg-[#373B53] dark:bg-[#DFE3FA]'}`}></span>{val.status}</button>
                    <img src={GoInDetail} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

export default React.memo(Home);