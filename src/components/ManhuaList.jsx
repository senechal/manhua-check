
/* eslint-disable react/prop-types */

import { useState, useEffect, useContext } from 'react';
import { set } from 'lodash-es';
import { Manhua } from './Manhua';
import {getData, DataContext} from '../helpers';

let resource;
export const ManhuaList = ({reset = false, onResetDone}) => {
  const [ filter, setFilter ] = useState('');
  const { gistId, filename } = useContext(DataContext);

  if(!resource && gistId && filename) {
    console.log(resource, gistId, filename)
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
    }
  }, [reset, onResetDone])

  const database = resource?.read() || {};

  return (
    <>
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
        Object.keys(database || {}).filter(slug => {
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
                const data = {...database};
                set(data, [slug, 'chapter'], chapter + 1)

              }}
            />
          )
        })
      }
      </div>
    </>
  )
}