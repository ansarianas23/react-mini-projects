import React from 'react'

const Header = ({currentProject, setCurrentProject, projectList}) => {



  return (
    <div className='sticky top-0 w-full h-12 flex items-center px-4 shadow-md'>
      <ul className='flex space-x-4'>
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
