import React, { useState } from 'react'
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Header = ({currentProject, setCurrentProject, projectList}) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleClick = (e)=>{
    setCurrentProject(e.target.innerText);
    setToggleMenu(false);
  }


  return (
    <>
      <div className='sticky top-0 w-full flex items-center h-12 px-4 shadow-md z-20 space-x-4'>
        <span onClick={()=>{setToggleMenu(true)}} className='text-xl lg:cursor-pointer lg:hover:bg-gray-300 lg:hover:bg-opacity-50 rounded-full p-2'><FaBars /></span>
        <span className='text-2xl font-bold italic cursor-pointer hover:scale-105 hover:text-red-600 delay-75 transition-transform'>Mini Projects</span>
      </div>

        {/* Project List */}
        {/* <ul className={`min-w-[250px] h-screen absolute top-0 left-0 p-5 space-y-4 bg-white bg-opacity-35 backdrop-blur-sm text-black flex flex-col shadow-lg ${toggleMenu? "translate-x-0" : "-translate-x-full"} transition-transform z-20`}>

          <span onClick={()=>setToggleMenu(false)} className='absolute text-3xl right-3 cursor-pointer hover:text-red-600 delay-75 transition-transform'><IoMdClose /></span>
          {
            projectList.map((listItem)=>{
              return  <li 
              key={listItem} onClick={handleClick}
              className={`${currentProject === listItem?"text-red-600" : ""} cursor-pointer hover:text-red-600 font-semibold transition-all`}>
                {listItem}
              </li>
            })
          }
        </ul> */}

        {toggleMenu && <div className={`w-full h-full bg-black bg-opacity-40 absolute top-0 left-0 z-20`}>

          <ul className={`w-[250px] h-screen p-5 space-y-4 bg-white text-black flex flex-col shadow-lg relative ${toggleMenu? "translate-x-0" : "-translate-x-full"}  transition-transform`}>
            <span onClick={()=>setToggleMenu(false)} className='absolute text-3xl right-3 cursor-pointer hover:text-red-600 delay-75 transition-transform'><IoMdClose /></span>
            {
              projectList.map((listItem)=>{
                return  <li 
                key={listItem} onClick={handleClick}
                className={`${currentProject === listItem?"text-red-600" : ""} cursor-pointer hover:text-red-600 font-semibold transition-all`}>
                  {listItem}
                </li>
              })
            }
          </ul>
        </div>}
    </>
  )
}

export default Header
