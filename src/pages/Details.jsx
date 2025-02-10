import React, { useState } from 'react'
import DataJson from '../assets/data.json'
import { useNavigate, useParams } from 'react-router-dom';
import GoBack from '../assets/select.svg'

function Details() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState(DataJson.find(item => item.id === id));

  function handleChange() {
    setData(oldData => ({ ...oldData, status: 'paid' }));
  }

  return (
    <div className='mt-[8px]'>
      <div className='flex flex-col'>
        <button onClick={() => { navigate(-1) }} className='flex items-center gap-[24px] font-bold text-[#0C0E16] text-[12px] dark:text-white'><img className='rotate-[90deg]' src={GoBack} /> Go back</button>
        <div className='flex justify-between bg-white dark:bg-[#1E2139] mt-[32px] mb-[16px] p-[24px] lg:px-[32px] lg:py-[20px] rounded-[8px]'>
          <div className='flex justify-between items-center gap-[16px] w-full md:max-w-[160px]'>
            <h2 className='font-normal text-[#858BB2] text-[12px] dark:text-[#DFE3FA]'>Status</h2>
            <button className={`gap-[8px] font-bold flex items-center justify-center px-[18px] py-[13px] rounded-[6px] ${data.status == 'paid' ? 'text-[#33D69F] bg-[#F3FCF9] dark:bg-[#1F2B3F]' : data.status == 'pending' ? 'text-[#FF8F00] dark:bg-[#2B2736] bg-[#FFF8F0]' : 'text-[#373B53] dark:bg-[#292C44] dark:text-[#DFE3FA] bg-[#F3F3F5]'} capitalize`}><span className={`inline-block w-[8px] h-[8px] rounded-full ${data.status == 'paid' ? 'bg-[#33D69F]' : data.status == 'pending' ? 'bg-[#FF8F00]' : 'bg-[#373B53] dark:bg-[#DFE3FA]'}`}></span>{data.status}</button>
          </div>
          <div className='bottom-0 left-0 md:static fixed flex justify-end gap-[8px] bg-white dark:bg-[#1E2139] md:p-0 px-[24px] py-[22px] ring-0 w-full md:max-w-[370px]'>
            <button className='bg-[#F9FAFE] dark:bg-[#252945] px-[23px] py-[17px] rounded-[24px] font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA] active:scale-95 transition-[0.3s]'>Edit</button>
            <button className='bg-[#EC5757] px-[23px] py-[17px] rounded-[24px] font-bold text-[12px] text-white active:scale-95 transition-[0.3s]'>Delete</button>
            <button onClick={handleChange} className={`bg-[#7C5DFA] px-[27px] py-[17px] rounded-[24px] font-bold text-[12px] text-white active:scale-95 transition-[0.3s] ${data.status == 'paid' ? 'hidden' : data.status == 'draft' ? 'hidden' : 'block'}`}>Mark as Paid</button>
          </div>
        </div>
      </div>
      <div className='bg-white dark:bg-[#1E2139] mb-[100px] md:mb-[50px] p-[24px] rounded-[8px]'>
        <div className='flex sm:flex-row flex-col sm:justify-between gap-[30px]'>
          <div className='flex flex-col gap-[4px]'>
            <h3 className='font-bold text-[#0C0E16] text-[12px] dark:text-white'><span className='text-[#7E88C3] dark:text-[#7E88C3]'>#</span>{data.id}</h3>
            <p className='font-normal text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>{data.description}</p>
          </div>
          <ul className='flex flex-col items-start sm:items-end font-normal text-[#7E88C3] text-[11px] dark:text-[#DFE3FA]'>
            <li>{data.senderAddress.street}</li>
            <li>{data.senderAddress.city}</li>
            <li>{data.senderAddress.postCode}</li>
            <li>{data.senderAddress.country}</li>
          </ul>
        </div>
        <div className='flex flex-wrap gap-[41px] sm:gap-[70px] md:gap-[110px] mt-[31px] md:mt-[21px]'>
          <div className='flex flex-col gap-[32px]'>
            <div className='flex flex-col items-start gap-[12px]'>
              <p className='font-normal text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>Invoice Date</p>
              <h4 className='font-bold text-[#0C0E16] text-[15px] dark:text-white'>{new Date(data.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</h4>
            </div>
            <div className='flex flex-col items-start gap-[12px]'>
              <p className='font-normal text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>Payment Due</p>
              <h4 className='font-bold text-[#0C0E16] text-[15px] dark:text-white'>{new Date(data.paymentDue).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</h4>
            </div>
          </div>
          <div className='flex flex-col gap-[12px]'>
            <p className='font-normal text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>Bill To</p>
            <h4 className='font-bold text-[#0C0E16] text-[15px] dark:text-white'>{data.clientName}</h4>
            <ul className='font-normal text-[#7E88C3 text-[#7E88C3] text-[11px] dark:text-[#DFE3FA]'>
              <li>{data.clientAddress.street}</li>
              <li>{data.clientAddress.city}</li>
              <li>{data.clientAddress.postCode}</li>
              <li>{data.clientAddress.country}</li>
            </ul>
          </div>
          <div>
            <p className='font-normal text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>Sent to</p>
            <h4 className='font-bold text-[#0C0E16] text-[15px] dark:text-white'>{data.clientEmail}</h4>
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
              data.items && data.items.map((val, idx) => (
                <div key={idx}>
                  <div className='md:hidden flex justify-between items-center'>
                    <div className='flex flex-col gap-[8px]'>
                      <h6 className='font-bold text-[#0C0E16] text-[12px] dark:text-white'>{val.name}</h6>
                      <p className='font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>{val.quantity} x £ {val.price.toFixed(2)}</p>
                    </div>
                    <p className='font-bold text-[#0C0E16] text-[12px] dark:text-white'>£{val.total.toFixed(2)}</p>
                  </div>
                  <div className='hidden md:flex justify-between items-center'>
                    <h6 className='font-bold text-[#0C0E16] text-[12px] dark:text-white'>{val.name}</h6>
                    <div className='flex justify-between w-full max-w-[278px]'>
                      <p className='font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>{val.quantity}</p>
                      <p className='font-bold text-[#7E88C3] text-[12px] dark:text-[#DFE3FA]'>£{val.price.toFixed(2)}</p>
                      <p className='font-bold text-[#0C0E16] text-[12px] dark:text-[#DFE3FA]'>£{val.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='flex justify-between items-center bg-[#373B53] dark:bg-[#0C0E16] p-[24px] rounded-b-[8px] text-white'>
            <h5 className='font-normal text-[11px]'>Grand Total</h5>
            <h3 className='font-bold text-[20px]'>£{data.total.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Details);