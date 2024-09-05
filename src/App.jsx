
import { useState, useEffect, Suspense } from 'react';
import { NewTitle } from './components/NewTitle';
import { ManhuaList } from './components/ManhuaList';
import { GistSettings } from './components/GistSettings';
import { DataContext } from './helpers';

import  {
  Cog6ToothIcon as Cog,
} from '@heroicons/react/20/solid'


const database = {
    'the-beginning-after-the-end': {
      name: 'The Beginning After the End',
      chapter: 125,
      active: false,
    },
    'solo-leveling': {
      name: 'Solo Leveling',
      chapter: 150,
      active: true,
    },
    'adventures-of-sinbad': {
      name: 'Adventures of Sinbad',
      chapter: 100,
      active: true,
    },
    'my-wife-is-a-demon-queen': {
      name: 'My Wife is a Demon Queen',
      chapter: 75,
      active: true,
    },
    'the-gamer': {
      name: 'The Gamer',
      chapter: 200,
      active: true,
    }
  };


function App() {
  const [ settings, setSettings ] = useState(false);
  const [context, setContext] = useState({});
  const [resetList, setResetList] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const gistId = localStorage.getItem("gistId");
    const filename = localStorage.getItem("filename");
    setContext({token, gistId, filename})
  }, [])
  return (
    <DataContext.Provider value={context}>
      <div className="popup font-lexend">
        <div className="relative flex size-full min-h-screen flex-col bg-[#06080E] dark group/design-root overflow-x-hidden" >
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-40 flex flex-1 justify-center">
              <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] flex-1">
                <div className="flex justify-between gap-3 p-4 items-center">
                  <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Manhua Check</p>
                  <Cog className='size-6 text-white cursor-pointer' onClick={() => setSettings(state => !state)} />
                </div>
                <GistSettings open={settings} onSubmit={() => {
                  setSettings(false);
                  setResetList(true);
                  }}
                 />
                <NewTitle />
                <Suspense fallback={<div>Loading...</div>}>
                  <ManhuaList database={database} reset={resetList} onResetDone={() => setResetList(false)}/>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DataContext.Provider>
  )
}

export default App
