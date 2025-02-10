import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BtnImgPlus from "../assets/btnIconPlus.svg";
import EmptyData from "../assets/EmptyData.png";
import SelectIcon from "../assets/select.svg";
import GoInDetail from '../assets/goInDetail.svg'
import DataJson from '../assets/data.json'
import GoBack from '../assets/select.svg'

function Home() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (filterValue !== '') {
      let valFil = filterValue.toLowerCase();
      setData(DataJson.filter((el) => el.status.toLowerCase() === valFil));
    } else {
      setData(DataJson)
    }
  }, [filterValue]);

  useEffect(() => {
    if (data.length) {
      setCount(data.length);
    }
  }, [data]);

  const filter = ["Paid", "Pending", "Draft"];

  const transition = { duration: 0.3, ease: "easeInOut" };

  const variants = {
    open: { opacity: 1, y: 0, transition },
    close: { opacity: 0, y: -10, transition },
  };

  function formatDate(dateStr) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-GB', options).replace(',', '');
  };

  function handleRedirec(id) {
    navigate(`/${id}`)
  }

  return (
    <div>
      {
        modal && (
          <div className='top-0 left-0 fixed bg-white dark:bg-[#141625] px-[24px] pt-[32px] pb-[188px] w-screen h-screen animate-slideIn scroll-auto'>
            <div className="overflow-y-auto">
              <button onClick={() => { setModal(false) }} className='flex items-center gap-[24px] font-bold text-[#0C0E16] text-[12px] dark:text-white'><img className='rotate-[90deg]' src={GoBack} /> Go back</button>
              <h3 className="my-[24px] font-bold text-[#0C0E16] text-[24px] dark:text-white">New Invoice</h3>
              <p className="mb-[24px] font-bold text-[#7C5DFA] text-[12px]">Bill From</p>
              <div className="mb-[40px]">
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="streetAddress1">Street Address
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="streetAddress1" />
                </label>
                <div className="flex justify-between md:gap-[23px] my-[24px]">
                  <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="city1">City
                    <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="city1" />
                  </label>
                  <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="postCode1">Post Code
                    <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="postCode1" />
                  </label>
                </div>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="country1">Country
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="country1" />
                </label>
              </div>
              <div>
                <p className="mb-[24px] font-bold text-[#7C5DFA] text-[12px]">Bill To</p>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="name">Client’s Name
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="name" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="email">Client’s Email
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="email" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="streetAddress2">Street Address
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="streetAddress2" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="city2">City
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="city2" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="postCode2">Post Code
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="postCode2" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="country2">Country
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="country2" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="invoiceDate">Invoice Date
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="invoiceDate" />
                </label>
                <label className="flex flex-col gap-[10px] font-normal text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="paymentTerms">Payment Terms
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="paymentTerms" />
                </label>
                <label className="flex flex-col font-normalgap-[10px] text-[#7E88C3] text-[12px] dark:text-[#888EB0]" htmlFor="projectDescription">Project Description
                  <input className="bg-white dark:bg-[#1E2139] px-[20px] border border-[#DFE3FA] dark:border-[#252945] rounded-[4px] h-[48px] font-bold text-[#0C0E16] text-[12px] dark:text-white dark:boder-[#252945] #DFE3FA]" type="text" id="projectDescription" />
                </label>
              </div>
            </div>
            <div className="right-0 bottom-0 left-0 fixed flex justify-between gap-[5px] bg-white dark:bg-[#1E2139] px-[24px] py-[22px]">
              <button onClick={() => { setModal(false) }} className="bg-[#F9FAFE] dark:bg-[#252945] px-[16px] py-[17px] rounded-[24px] font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA] active:scale-95 transition-[0.3s]">Discard</button>
              <button className="bg-[#373B53] px-[16px] py-[17px] rounded-[24px] font-bold text-[#888EB0] text-[12px] dark:text-[#DFE3FA] active:scale-95 transition-[0.3s]">Save as Draft</button>
              <button className="bg-[#7C5DFA] px-[16px] py-[17px] rounded-[24px] font-bold text-[12px] text-white active:scale-95 transition-[0.3s]">Save & Send</button>
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