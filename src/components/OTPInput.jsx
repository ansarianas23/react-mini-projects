import React, { useEffect, useRef, useState } from 'react'

const OTPInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault()
    // send number to backend for OTP
    setShowOtpInput(true);
  }

  const onOtpSubmit = (finalOTP)=>{
    // console.log("login successfull", finalOTP);
  }


  return (
    <div className='w-full h-[calc(h-screen - h-12)]'>
      {!showOtpInput && <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-4'>
        <h1 className='font-semibold text-2xl text-center py-3'>Enter Your Phone Number</h1>
        <input onChange={(e)=>{setPhoneNumber(e.target.value)}} 
        type="text" 
        placeholder='Enter Your Phone Number Here' 
        className='mx-auto border p-2 w-72' />
        <button className='bg-black text-white w-fit px-4 py-2 rounded-md'>Send OTP</button>
      </form>}

      {showOtpInput && <div>
        <h1 className='font-semibold text-2xl text-center py-3'>Enter OTP</h1>
        <OTPInputs length = {4} onOtpSubmit={onOtpSubmit}/>
      </div>}

    </div>
  )
}

export default OTPInput

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------

export const OTPInputs = ({length=4, onOtpSubmit=()=>{}}) => {

  const [otp, setOtp] = useState(Array(length).fill(""))
  // This array holds array of reference of all the inputs
  const inputRefs = useRef([]);
  // console.log(inputRefs);
  // console.log(otp);

  useEffect(()=>{
    inputRefs.current[0].focus();
  },[])

  const handleChange =(idx, e)=>{
    const value = e.target.value;
    if(isNaN(value)) return
    
    const newOTP = [...otp]
    // allow only one input
    newOTP[idx] = value.substring(value.length - 1);
    // console.log("newOTP",newOTP, "otp",otp)
    setOtp(newOTP);

    // submit trigger
    const combineOTP = newOTP.join("");
    if(combineOTP.length === length) onOtpSubmit(combineOTP);

    // Move focus to next input if current field is filled
    if(value && idx < length - 1 && inputRefs.current[idx+1]){
      inputRefs.current[idx+1].focus();

      // if(value && idx < length && inputRefs.current[otp.indexOf("")].focus()){
      //   inputRefs.current[otp.indexOf("")].focus();
      // }
    }

  }

  const handleKeyDown = (idx, e)=>{
     // Move focus to previous input field if pressed Backspace
    if(e.key === "Backspace" && !otp[idx] && idx >0 && inputRefs.current[idx - 1]){
      inputRefs.current[idx-1].focus();
    }
  }

  const handleClick = (idx)=>{
    inputRefs.current[idx].setSelectionRange(1, 1);

    // Optional Validation
    if(idx > 0 && !otp[idx - 1]){
      inputRefs.current[otp.indexOf("")].focus();
    }
  }


  return (
    <div className='w-full h-[calc(h-screen - h-12)] flex space-x-2 mx-auto justify-center'>
      {
        otp.map((value,idx)=> <input 
        key={idx} 
        className='border w-12 h-12 text-center px-2' 
        type="text" 
        value={value}
        ref={(input)=> inputRefs.current[idx] = input}
        // ref={(input)=> console.log("input is",input)}
        onChange={(e)=>handleChange(idx, e)}
        onClick={()=>handleClick(idx)}
        onKeyDown={(e)=>handleKeyDown(idx, e)}
        />)
      }
      
    </div>
  )
}