
/* eslint-disable react/prop-types */

import { useState, useEffect, useContext } from 'react';
import { set, omit } from 'lodash-es';
import { Manhua } from './Manhua';
import { NewTitle } from './NewTitle';
import { getData, setData, DataContext, slugify } from '../helpers';

let resource;
export const ManhuaList = ({reset = false, onResetDone}) => {
  const [ filter, setFilter ] = useState('');
  const { gistId, filename, token } = useContext(DataContext);
  const [ database, setDatabase ] = useState(resource?.read())

  if(!resource && gistId && filename) {
    resource = getData(gistId, filename);
  }
  useEffect(() => {
    return () => {
      resource = null
    }
}, [])

  useEffect(() => {
    if (reset) {
      resource = null;
      onResetDone();
    } else {
      setDatabase(resource?.read())
    }
  }, [reset, onResetDone])

  const onSuccess = (req) => {
    setDatabase(req)
  }

  const onError = (err) => {
    console.log(err)
  }

  const list =  Object.keys(database || {})

  return (
    <>
    <NewTitle onSubmit={(title) => {
       const data = {
        ...database,
        [slugify(title)]: {
          name: title,
          chapter: 0,
          active: true,
        }
      };
       setData(data, gistId, filename, token).then(onSuccess, onError);
      }}
      size={list.length}
    />
    <div className="flex items-center px-4 py-3 justify-end">
      <label className="flex flex-col min-w-40 flex-1">
          <input
            placeholder="Search"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#153645] focus:border-none h-13 placeholder:text-white p-4 text-base font-normal leading-normal"
            value={filter}
            onChange={({target}) => setFilter(target.value)}
          />
        </label>
      </div>
      <div>
      {
        list.filter(slug => {
          const { name } = database[slug];
          return name.toLowerCase().includes(filter.toLowerCase())

        }).map(slug => {
          const { name, chapter, active } = database[slug];

          return (
            <Manhua
              key={slug}
              name={name}
              chapter={chapter}
              active={active}
              onCounterClick={() => {
                if (active) {
                  const data = {...database};
                  set(data, [slug, 'chapter'],  parseInt(chapter, 10) + 1);
                  setData(data, gistId, filename, token).then(onSuccess, onError);
                }
              }}
              onSetAcive={() => {
                const data = {...database};
                set(data, [slug, 'active'], !active);
                setData(data, gistId, filename, token).then(onSuccess, onError);
              }}
              onUpdateChapter={(newChapter) => {
                if (active) {
                  const data = {...database};
                  set(data, [slug, 'chapter'], parseInt(newChapter, 10));
                  setData(data, gistId, filename, token).then(onSuccess, onError);
                }
              }}
              onRemove={() => {
                const data = omit(database, [slug]);
                setData(data, gistId, filename, token).then(onSuccess, onError);
              }}
            />
          )
        })
      }
      </div>
    </>
  )
}