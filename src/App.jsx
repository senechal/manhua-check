/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { ManhuaList } from './components/ManhuaList';
import { GistSettings } from './components/GistSettings';
import { DataContext, setData, getData } from './helpers';

import {
  Cog6ToothIcon as Cog,
  ArrowPathIcon as Spinner,
} from '@heroicons/react/20/solid'

function App() {
  const [settings, setSettings] = useState(false);
  const [database, setDatabase] = useState({});
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState({});

  const gistSetter = (gistId, filename, token, dataSetter) => async (data) => {
    const updateData = await setData(data, gistId, filename, token);
    dataSetter(updateData);
  }

  const initContext = () => {
    const token = localStorage.getItem("token");
    const gistId = localStorage.getItem("gistId");
    const filename = localStorage.getItem("filename");
    const setter = gistSetter(gistId, filename, token, setDatabase);
    setLoading(true)
    getData(gistId, filename).then(data => {
      setDatabase(data);
      setLoading(false);
      if(settings) {
        setSettings(false);
      }
    })
    setContext(state => ({ ...state, setter }));
  }

  useEffect(initContext, []);


  return (
    <DataContext.Provider value={{ ...context, database }}>
      <div className="popup font-lexend">
        <div className="overflow-y-scroll relative flex size-full min-h-screen flex-col bg-[#06080E] dark group/design-root overflow-x-hidden" >
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-40 flex flex-1 justify-center">
              <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] flex-1">
                <div className="flex justify-between gap-3 p-4 items-center">
                  <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Manhua Check</p>
                  {
                    !loading
                      ? <Cog className='hover:text-[#e1e243] size-6 text-white cursor-pointer' onClick={() => setSettings(state => !state)} />
                      : <Spinner className='animate-spin size-6 text-white cursor-pointer' />
                  }
                </div>
                <GistSettings open={settings} onSubmit={initContext} loading={loading}/>
                <ManhuaList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DataContext.Provider>
  )
}

export default App
