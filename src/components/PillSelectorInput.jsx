import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from "react-icons/io";

const PillSelectorInput = () => {

  const inputRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set());  
  

  useEffect(()=>{
    inputRef.current.focus();

    const fetchUsers = () =>{
      if(searchText.trim() === ""){
        setSuggestions([]);
        return;
      }
      
      fetch('https://dummyjson.com/users/search?q='+searchText)
      .then(response => response.json())
      .then(data => setSuggestions(data))
      .catch((err)=>{
        console.log(console.log(err))
      })
    }

    fetchUsers();
  },[searchText])
  
  const handleAddUser=(user)=>{
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUsersSet(new Set([...selectedUsersSet, user.email]));
    setSuggestions([]);
    setSearchText("");
  }

  const HnadleRemoveUser = (user)=>{
    const updatedUsers = selectedUsers.filter((selectedUsers)=>selectedUsers.id !== user.id)

    setSelectedUsers(updatedUsers);

    // now also removing that email from set
    const updatedEmails = new Set(setSelectedUsersSet);
    updatedEmails.delete(user.email);
    setSelectedUsersSet(updatedEmails);
  }

  const handleKeyDown = (e)=>{
    if(e.key === "Backspace" && e.target.value === "" && selectedUsers.length > 0){
      const lastUser = selectedUsers[selectedUsers.length - 1]
      HnadleRemoveUser(lastUser);
    }
    setSuggestions([])
  }

  return (
    <div className='flex flex-wrap items-center border w-[50%] mx-auto mt-10 rounded-2xl p-3 gap-3'>
      {/* Pill */}
      {
        selectedUsers?.map((pillData)=> <Pill 
        key={pillData.email} 
        pillData={pillData}
        onClick={()=>HnadleRemoveUser(pillData)}
        />)
      }

      <div className='flex-auto relative'>
        <input 
        ref={inputRef}
        type="text" 
        className='p-2 outline-none w-full'
        placeholder='Enter User name'
        value={searchText}
        onChange={(e)=>{setSearchText(e.target.value)}}
        onKeyDown={handleKeyDown}
        />
        {/* dropdown */}
        {suggestions?.users?.length>=1 && <div className='absolute border-[1px] min-w-64 h-56 rounded-md bg-white overflow-y-scroll'>
          <ul>
            {
              suggestions?.users?.map((user)=>{
                return !selectedUsersSet.has(user.email)? (
                <li key={user.email}
                onClick={()=>handleAddUser(user)}
                className='hover:bg-stone-200 cursor-pointer p-3'>
                  {user.firstName} {user.lastName}
                </li>) : <></>
              }) 
            }
          </ul>
        </div>}
      </div>
    </div>
  )
}

export default PillSelectorInput


export const Pill= ({ pillData, onClick }) => {
  return (
    <div className='flex items-center bg-stone-200 text-black cursor-pointer rounded-full px-3 py-2'>
      <p className='font-semibold'>{pillData.firstName} {pillData.lastName}</p>
      <span onClick={onClick} className='font-bold ml-2 text-xl'><IoMdClose /></span>
    </div>
  )
}
