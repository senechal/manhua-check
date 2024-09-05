/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import  { PlusIcon as Plus } from '@heroicons/react/20/solid'
import  { ArrowPathIcon as Spinner } from '@heroicons/react/20/solid'

export const NewTitle = ({ onSubmit, size }) => {
  const [ title, setTitle ] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    setTitle("");
  }, [size])

  return (
    <div className="flex items-center px-4 py-3 justify-end">
    <label className="flex flex-col min-w-40 flex-1 pr-4">
      <input
        placeholder="New Title"
        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#153645] focus:border-none h-13 placeholder:text-white p-4 text-base font-normal leading-normal"
        value={title}
        onChange={({target}) => setTitle(target.value)}
      />
    </label>
    <button
      onClick={() => {
        setLoading(true);
        onSubmit(title);
      }}
      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-[#e1e243] text-[#0f1a24] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
    >
      {
        loading
          ? <Spinner className='animate-spin size-6 text-[#0f1a24]'/>
          : <Plus className='size-6 text-[#0f1a24]'/>
      }
      <span className="truncate">Add New</span>
    </button>
  </div>
  )
}