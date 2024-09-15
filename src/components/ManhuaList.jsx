


import { useState, useContext } from 'react';
import { useIntl } from '../hooks/useIntl';
import { set, omit } from 'lodash-es';
import { Manhua } from './Manhua';
import { NewTitle } from './NewTitle';
import { DataContext, slugify } from '../helpers';

export const ManhuaList = () => {
  const { getMessage } = useIntl();

  const [ filter, setFilter ] = useState('');
  const { database, setter } = useContext(DataContext);

  const list =  Object.keys(database || {})

  return (
    <>
    <NewTitle onSubmit={async (title) => {
       const data = {
        ...database,
        [slugify(title)]: {
          name: title,
          chapter: 0,
          active: true,
        }
      };
      await setter(data);
      }}
      size={list.length}
    />
    <div className="flex items-center px-4 py-3 justify-end">
      <label className="flex flex-col min-w-40 flex-1">
          <input
            placeholder={getMessage('SEARCH')}
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
              onCounterClick={async () => {
                if (active) {
                  const data = {...database};
                  set(data, [slug, 'chapter'],  parseInt(chapter, 10) + 1);
                  await setter(data);
                }
              }}
              onSetAcive={async () => {
                const data = {...database};
                set(data, [slug, 'active'], !active);
                await setter(data);
              }}
              onUpdateChapter={async (newChapter) => {
                if (active) {
                  const data = {...database};
                  set(data, [slug, 'chapter'], parseInt(newChapter, 10));
                  await setter(data);
                }
              }}
              onRemove={ async() => {
                const data = omit(database, [slug]);
                await setter(data);
              }}
            />
          )
        })
      }
      </div>
    </>
  )
}