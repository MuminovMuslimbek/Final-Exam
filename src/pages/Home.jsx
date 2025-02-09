import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BtnImgPlus from "../assets/btnIconPlus.svg";
import EmptyData from "../assets/EmptyData.png";
import SelectIcon from "../assets/select.svg";
import dataJson from '../assets/data.json'

function Home() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [filterValue, setFilterValue] = useState("");


  useEffect(() => {
    setData(dataJson)
  }, []);

  useEffect(() => {
    setCount(data.length);
  }, [data]);

  console.log(data)

  const filter = ["Paid", "Pending", "Draft"];

  const transition = { duration: 0.3, ease: "easeInOut" };

  const variants = {
    open: { opacity: 1, y: 0, transition },
    close: { opacity: 0, y: -10, transition },
  };

  return (
    <div>
      <nav className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start gap-[4px] md:gap-[8px]">
          <h1 className="font-bold text-[#0C0E16] text-[20px] md:text-[32px] dark:text-white"> Invoices </h1>
          <p className="md:hidden font-normal text-[#888EB0] text-[12px] dark:text-[#DFE3FA]"> {count} invoices </p>
          <p className="md:block hidden font-normal text-[#888EB0] text-[12px] dark:text-[#DFE3FA]"> There are {count} pending invoices</p>
        </div>
        <div className="flex items-center gap-[18px]">
          <div className="flex items-center cursor-pointer" onClick={() => setIsDropdown((prev) => !prev)}>
            <p className="md:block hidden font-medium dark:text-white"> Filter by status </p>
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
          <button className="flex items-center gap-[8px] active:scale-95 md:hidden bg-[#7C5DFA] p-[6px] pr-[14px] rounded-[24px] text-[12px] text-white transition-[0.3s]"> <img src={BtnImgPlus} alt="New" /> New </button>
          <button className="md:flex items-center gap-[8px] hidden active:scale-95 bg-[#7C5DFA] p-[6px] pr-[14px] rounded-[24px] text-[12px] text-white transition-[0.3s]"> <img src={BtnImgPlus} alt="New" /> New Invoice </button>
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
              <div key={idx} className="flex flex-col gap-[24px] bg-white dark:bg-[#1E2139] p-[24px] rounded-[8px]">
                <div className="flex justify-between">
                  <h4 className="font-bold text-[#0C0E16] text-[12px] dark:text-white"> <span className="text-[#7E88C3]">#</span>{val.id}</h4>
                  <p className="font-normal text-[#858BB2] text-[12px] dark:text-white">{val.clientName}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-[8px]">
                    <h5 className="font-normal text-[#858BB2] text-[12px] dark:text-[#DFE3FA]">Due  19 Aug 2021</h5>
                    <p className="font-bold text-[#0C0E16] text-[16px] dark:text-white">£{val.total.toFixed(2)}</p>
                  </div>
                  <button className={`gap-[8px] flex items-center bg-opacity-[5.71%] px-[18px] py-[13px] rounded-[6px] ${val.status == 'paid' ? 'text-[#33D69F] bg-[#33D69F]' : val.status == 'pending' ? 'text-[#FF8F00] bg-[#FF8F00]' : 'text-[#DFE3FA] bg-[#DFE3FA]'} capitalize`}><span className={`inline-block w-[8px] h-[8px] rounded-full ${val.status == 'paid' ? 'bg-[#33D69F]' : val.status == 'pending' ? 'bg-[#FF8F00]' : 'bg-[#DFE3FA]'}`}></span>{val.status}</button>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

export default Home;