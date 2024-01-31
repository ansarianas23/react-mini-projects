import React, { useState } from 'react'
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Header = ({currentProject, setCurrentProject, projectList}) => {
  const [toggleMenu, setToggleMenu] = useState(false);


  return (
    <div className='sticky top-0 w-full flex items-center h-12 px-4 shadow-md z-20'>
      <span onClick={()=>{setToggleMenu(true)}} className='md:hidden text-xl'><FaBars /></span>
      <ul className={`w-[50%] md:w-fit md:h-full h-screen absolute top-0 left-0 p-5 md:p-0 space-y-4 md:space-y-0 bg-white text-black md:flex md:flex-row md:items-center flex-col md:space-x-4 shadow-lg md:shadow-none ${toggleMenu? "":"-translate-x-full md:translate-x-0"}  transition-transform`}>

        <span onClick={()=>setToggleMenu(false)} className='absolute text-3xl right-3 md:hidden'><IoMdClose /></span>
        {
          projectList.map((listItem)=>{
            return  <li 
            key={listItem} onClick={(e)=>{setCurrentProject(e.target.innerText)}} 
            className={`${currentProject === listItem?"text-red-600":""} cursor-pointer hover:text-red-600 font-semibold transition-all`}>
              {listItem}
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Header
