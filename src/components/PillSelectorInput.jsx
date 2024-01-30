import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from "react-icons/io";

const PillSelectorInput = () => {

  const inputRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set());  
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  

  const fetchUsers = () =>{
    setActiveSuggestion(0)
    if(searchText.trim() === ""){
      setSuggestions([]);
      return;
    }
    
    fetch('https://dummyjson.com/users/search?q='+searchText)
    .then(response => response.json())
    .then(data => setSuggestions(data))
    .catch((err)=>{
      console.log(console.log(err));
    })
  }


  useEffect(()=>{
    // To focus by default on input
    inputRef.current.focus();

    const timer =  setTimeout(()=>{
      fetchUsers();
    },300)

    return ()=>{
      clearTimeout(timer);
    }

  },[searchText])
  
  // Function To add user as a pill
  const handleAddUser=(user)=>{
    setSelectedUsers([...selectedUsers, user]);
    // To cache the result so same user cannot be added twice.
    // Those who are added in pills are removed from suggestion list
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
      setSuggestions([])
    }
    else if (e.key === "ArrowDown" && suggestions?.users.length>0){
      e.preventDefault();
      setActiveSuggestion((prevIndex)=>
        prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    else if (e.key === "ArrowUp" && suggestions?.users.length>0){
      e.preventDefault();
      setActiveSuggestion((prevIndex)=>(prevIndex > 0 ? prevIndex-1 : 0));
    }
    else if (e.key === "Enter" && activeSuggestion>0 && activeSuggestion < suggestions.users.length){
      e.preventDefault();
      handleAddUser(suggestions.users[activeSuggestion]);
    }
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
        {suggestions?.users?.length>=1 && <div className='absolute top-12 border-[1px] min-w-64 h-56 rounded-md bg-white overflow-y-scroll'>
          <ul>
            {
              suggestions?.users?.map((user, index)=>{
                return !selectedUsersSet.has(user.email)? (
                <li key={user.email}
                onClick={()=>handleAddUser(user)}
                className={`hover:bg-stone-200 cursor-pointer p-3 ${index === activeSuggestion? "bg-stone-200":""}`}>
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
