/* eslint-disable react/prop-types */
import { useState } from 'react';
import  {
  PlusIcon as Plus,
  PencilSquareIcon as Edit,
  CheckCircleIcon as True,
  XCircleIcon as False,
  ArrowTurnDownLeftIcon as Enter,
  TrashIcon as Trash,
} from '@heroicons/react/20/solid'

const validateNumber = (str, fallback) => {
  return str.match(/^\d+$/gm) ? str : fallback
}

export const Manhua = ({name,chapter, active }) => {
  const [ edit, setEdit ] = useState(false);
  const [chapterInput, setChapterInput] = useState(chapter || "")

  return (
    <>
      <div className="flex items-start gap-4 px-4 py-2 pt-2 justify-between">
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <p className={`text-white text-base font-medium leading-normal line-clamp-1 pr-4 ${active ? '' : 'line-through'}`}>{name}</p>
            <Edit className='size-5 text-white cursor-pointer' onClick={() => setEdit(state => !state)}/>
          </div>
          <p className="text-[#e1e243] text-sm font-normal leading-normal line-clamp-2">Chapter {active ? chapter : '?'}</p>


        </div>
        <div className="shrink-0">
          <button
            className="flex min-w-[32px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-2 bg-[#153645] text-white text-sm font-medium leading-normal w-fit"
          >
            <span className="truncate"><Plus className='size-3 text-white'/></span>
          </button>
        </div>
      </div>
      {
        edit ? (
          <div className='flex flex-col gap-4 px-4 justify-end'>
            <hr className='border-gray-800 dark:border-white'/>
            <div className="flex items-center justify-end">
              <label className="flex flex-col min-w-40 flex-1 pr-4">
                <input
                  placeholder="Chapter"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#153645] focus:border-none h-10 placeholder:text-white p-4 text-base font-normal leading-normal"
                  value={chapterInput}
                  onChange={({target}) => setChapterInput((state) => validateNumber(target.value, state))}
                />
              </label>
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-[#e1e243] text-[#0f1a24] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <Enter className='size-6 text-[#0f1a24] cursor-pointer'/>
              </button>
            </div>
            <p className="flex items-center text-white text-sm font-normal leading-normal line-clamp-2">
              Active {active ? <True className='size-6 text-[#e1e243] ml-4 cursor-pointer' /> : <False className='size-6 text-[#e1e243] ml-4 cursor-pointer' />}
            </p>
            <p className="flex items-center text-white text-sm font-normal leading-normal line-clamp-2">
              Remove? <Trash className='size-6 text-[#e1e243] ml-4 cursor-pointer' />
            </p>
            <hr className='border-gray-800 dark:border-white'/>
          </div>
        ) : null
      }
   </>
  )
}