'use client'
import React, { useState } from 'react'
const SearchName = () => {
    const [name,setName]=useState('')
    const [choice,setChoice]=useState('');
    const [age,setAge] =useState(0);
    const [gender,setGender] =useState('');
    const [nationality,setNationality] =useState([]);
    const [error,setError]=useState('');
    const handleClick=()=>{
        if(choice.length==0){
            setError("Enter a name Please");
            setName('')
            setAge(0)
            setGender('')
            setNationality([])
            return([])
        }
        else{
            setError('');
        }
        fetch(`https://api.agify.io?name=${choice}`)
        .then(res=>res.json())
        .then(val=>{
            setAge(val.age);
            setName(val.name)
        })
        fetch(`https://api.genderize.io?name=${choice}`)
        .then(res=>res.json())
        .then(val=>setGender(val.gender))
        fetch(`https://api.nationalize.io?name=${choice}`)
        .then(res=>res.json())
        .then(val=>setNationality(val.country))
    }
    return (<>
        
            <div className="mb-6 flex w-[50%] ml-[25%]">
                <input onChange={(e)=>setChoice(e.target.value)} value={choice} type="text" id="name" className="bg-gray-50 border mx-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Name" required />
                <button onClick={()=>handleClick()} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                
            </div>
            {error && <span className='text-red-900 mb-6 flex w-[50%] ml-[26%]'>{error}</span>}

        
        {name && <p className='ml-[26%]'>Name: {name}</p>}
        {age>0 && <p className='ml-[26%]'>Age: {age}</p>}
        {gender && <p className='ml-[26%]'>Gender: {gender}</p>}
        {nationality.length>0 && <div className='ml-[26%]'>Nationality: {
            nationality.map((item)=><p className='ml-5' key={item.country_id}>{item.country_id}- {item.probability}%</p>)
        }</div>}
        </>
    )
}

export default SearchName