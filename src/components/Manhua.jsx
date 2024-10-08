/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useIntl } from '../hooks/useIntl';
import {
  PlusIcon as Plus,
  PencilSquareIcon as Edit,
  CheckCircleIcon as True,
  XCircleIcon as False,
  ArrowTurnDownLeftIcon as Enter,
  TrashIcon as Trash,
  ArrowPathIcon as Spinner,
} from '@heroicons/react/20/solid'

const validateNumber = (str, fallback) => {
  return str.match(/^\d+$/gm) || str === "" ? str : fallback
}


const Active = ({ active, loading, onClick }) => {
  if (loading) return <Spinner className='animate-spin size-6 text-[#e1e243] ml-4' />
  return active
    ? <True
      className='hover:text-[#a5a51a] size-6 text-[#e1e243] ml-4 cursor-pointer'
      onClick={onClick}
    />
    : <False
      className='hover:text-[#a5a51a] size-6 text-[#e1e243] ml-4 cursor-pointer'
      onClick={onClick}
    />

}

export const Manhua = (props) => {
  const {
    name,
    chapter,
    active,
    source,
    onUpdate,
    onRemove,
  } = props;
  const { getMessage } = useIntl();

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState({
    source: false,
    counter: false,
    chapter: false,
    active: false,
    remove: false,
  });
  const [chapterInput, setChapterInput] = useState(chapter || "")
  const [sourceInput, setSourceInput] = useState(source || "")

  useEffect(() => {
    setLoading((state) => ({ ...state, chapter: false, counter: false }));
    setChapterInput(chapter)
  }, [chapter])

  useEffect(() => {
    setLoading({
      source: false,
      counter: false,
      chapter: false,
      active: false,
      remove: false,
    });
  }, [name, active, source]);

  const submitChapterHandler = () => {
    if(active && chapter !== chapterInput && chapterInput !== "") {
      setLoading((state) => ({ ...state, chapter: true }));
      onUpdate('chapter', parseInt(chapterInput, 10))
    }
  }

  const submitSourceHandler = () => {
    setLoading((state) => ({ ...state, source: true }));
    onUpdate('source', sourceInput)
  }

  const handleEnter = (submitHandler) => (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      submitHandler()
    }
  }

  return (
    <div className='relative'>
      <div className="flex items-start gap-4 px-4 py-2 pt-2 justify-between">
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <p title={name} className={`cursor-default text-white text-base font-medium leading-normal line-clamp-1 pr-4 ${active ? '' : 'line-through'}`}>{name}</p>
            <Edit className='size-5 text-white cursor-pointer hover:text-[#e1e243]' onClick={() => setEdit(state => !state)} />
          </div>
          <p className="text-[#e1e243] cursor-default text-sm font-normal leading-normal line-clamp-2">{getMessage('CHAPTER')} {active ? chapter : '?'}</p>
        </div>
        <div className="shrink-0">
          <button
            className="flex min-w-[32px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-2 bg-[#153645] hover:bg-[#2d7393] text-white text-sm font-medium leading-normal w-fit"
            onClick={() => {
              setLoading((state) => ({ ...state, counter: true }));
              if(active) {
                onUpdate('chapter', parseInt(chapter, 10) + 1)
              }
            }}
          >
            <span className="truncate">
              {
                loading.counter
                  ? <Spinner className='animate-spin size-3 text-white' />
                  : <Plus className='size-3 text-white' />
              }

            </span>
          </button>
        </div>
      </div>
      {
        edit ? (
          <div className='flex flex-col gap-4 px-4 justify-end'>
            <hr className='border-gray-800 dark:border-white' />
            {/** CHAPTER INPUT */}
            <div className="flex items-center justify-end">
              <label className="flex flex-col min-w-40 flex-1 pr-4">
                <input
                  placeholder={getMessage('CHAPTER')}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#153645] focus:border-none h-10 placeholder:text-white p-4 text-base font-normal leading-normal"
                  value={chapterInput}
                  onChange={({ target }) => setChapterInput((state) => validateNumber(target.value, state))}
                  onKeyDown={handleEnter(submitChapterHandler)}
                />
              </label>
              <button
                disabled={chapter === chapterInput || chapterInput === ""}
                className="disabled:bg-slate-200 disabled:cursor-not-allowed flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-[#e1e243] hover:bg-[#a5a51a] text-[#0f1a24] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
                onClick={submitChapterHandler}
              >
                {
                  loading.chapter
                    ? <Spinner className='animate-spin size-6 text-[#0f1a24] cursor-pointer' />
                    : <Enter className='size-6 text-[#0f1a24] cursor-pointer' />
                }

              </button>
            </div>
            {/** SOURCE INPUT */}
            <div className="flex items-center justify-end">
              <label className="flex flex-col min-w-40 flex-1 pr-4">
                <input
                  placeholder={getMessage('SOURCE')}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#153645] focus:border-none h-10 placeholder:text-white p-4 text-base font-normal leading-normal"
                  value={sourceInput}
                  onChange={({ target }) => setSourceInput(target.value)}
                  onKeyDown={handleEnter(submitSourceHandler)}
                />
              </label>
              <button
                disabled={source === sourceInput}
                className="disabled:bg-slate-200 disabled:cursor-not-allowed flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-[#e1e243] hover:bg-[#a5a51a] text-[#0f1a24] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
                onClick={submitSourceHandler}
              >
                {
                  loading.source
                    ? <Spinner className='animate-spin size-6 text-[#0f1a24] cursor-pointer' />
                    : <Enter className='size-6 text-[#0f1a24] cursor-pointer' />
                }

              </button>
            </div>
            {/** ACTIVE TOGGLE */}
            <p className="flex items-center text-white text-sm font-normal leading-normal line-clamp-2">
              {getMessage('ACTIVE')} <Active active={active} loading={loading.active} onClick={() => {
                setLoading((state) => ({ ...state, active: true }));
                onUpdate('active', !active)
              }} />
            </p>
            {/** REMOVE BUTTON */}
            <p className="flex items-center text-white text-sm font-normal leading-normal line-clamp-2">
              {getMessage('REMOVE')}
              {
                loading.remove
                  ? <Spinner className='animate-spin size-6 text-[#e1e243] ml-4' />
                  : <Trash
                    className='hover:text-[#a5a51a] size-6 text-[#e1e243] ml-4 cursor-pointer'
                    onClick={(e) => {
                      setLoading((state) => ({ ...state, remove: true }));
                      onRemove(e);
                    }}
                  />
              }
            </p>
            <hr className='border-gray-800 dark:border-white mb-2' />
          </div>
        ) : null
      }
    </div>
  )
}