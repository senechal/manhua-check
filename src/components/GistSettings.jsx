/* eslint-disable react/prop-types */
import { useState } from "react"
import { useIntl } from '../hooks/useIntl';

export const GistSettings = ({open, onSubmit}) => {
  const { getMessage } = useIntl();

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [gistId, setGistId] = useState(localStorage.getItem("gistId") || "");
  const [filename, setFilename] = useState(localStorage.getItem("filename") || "");
  return open ?(
    <div className='flex flex-col gap-4 px-4 justify-end'>
    <hr className='border-gray-800 dark:border-white'/>
    <div className="flex flex-col justify-between">
      <label className="flex flex-col min-w-40 flex-1 mb-2">
        <input
          placeholder={getMessage('GITHUB_PERSONAL_TOKEN')}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#153645] focus:border-none h-10 placeholder:text-white p-4 text-base font-normal leading-normal"
          value={token}
          onChange={({target}) => setToken(target.value)}

        />
      </label>
      <label className="flex flex-col min-w-40 flex-1  mb-2">
        <input
          placeholder={getMessage('GIST_ID')}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#153645] focus:border-none h-10 placeholder:text-white p-4 text-base font-normal leading-normal"
          value={gistId}
          onChange={({target}) => setGistId(target.value)}

        />
      </label>
      <label className="flex flex-col min-w-40 flex-1  mb-2">
        <input
          placeholder={getMessage('GIST_FILENAME')}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#153645] focus:border-none h-10 placeholder:text-white p-4 text-base font-normal leading-normal"
          value={filename}
          onChange={({target}) => setFilename(target.value)}

        />
      </label>
      <button
        onClick={() => {
          localStorage.setItem("token", token);
          localStorage.setItem("gistId", gistId);
          localStorage.setItem("filename", filename);
          onSubmit()
        }}
        className="hover:bg-[#a5a51a] flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-[#e1e243] text-[#0f1a24] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
      >
        {getMessage('SAVE')}
      </button>
    </div>
    <hr className='border-gray-800 dark:border-white'/>
  </div>
  ) : null
}