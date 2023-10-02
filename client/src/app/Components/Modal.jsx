import React from 'react'

export default function({setShowModal}) {
  return (
    <div
    className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-700'
  >
    <div className='absolute text-center p-5  bg-slate-300 w-1/2 h-1/2 border-black rounded-md'>
      <h1 className='font-bold text-2xl mt-20'>Thanks for the Purchase!</h1>
      <p>Your request has been recorded</p>
      <button
        className='px-2 py-1 mt-4 bg-red-600 text-white' onClick={()=>{setShowModal(false)}}
      >
        Close
      </button>
    </div>
  </div>
  )
}
