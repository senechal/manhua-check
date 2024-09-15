/* eslint-disable react/display-name */
/* eslint-disable no-undef */



import { useState, useContext, useEffect } from 'react';
import { useIntl } from '../hooks/useIntl';
import { set, omit } from 'lodash-es';
import { Manhua } from './Manhua';
import { NewTitle } from './NewTitle';
import { DataContext, slugify } from '../helpers';


const manhuaMap = (database, setter) => (slug) => {
  const { name, chapter, active, source } = database[slug];

  return (
    <Manhua
      key={slug}
      name={name}
      chapter={chapter}
      source={source}
      active={active}
      onUpdate={async (target, value) => {
        const data = { ...database };
        set(data, [slug, target], value);
        await setter(data);
      }}
      onRemove={async () => {
        const data = omit(database, [slug]);
        await setter(data);
      }}
    />
  )
}

const getParsedList = (database, tab) => {
  const list = Object.keys(database || {});
  if (!tab) return { list };

  return list.reduce((acc, item) => {
    const { source } = database[item];
    if (source) {
      const sourceUrl = new URL(source || '/');
      if (sourceUrl?.host === tab?.host) {
        return { ...acc, local: [...acc.local, item] }
      }
    }
    return { ...acc, list: [...acc.list, item] }
  }, { local: [], list: [] })
}

export const ManhuaList = () => {
  const { getMessage } = useIntl();

  const [tab, setTab] = useState();
  const [filter, setFilter] = useState('');
  const { database, setter } = useContext(DataContext);

  const { local, list } = getParsedList(database, tab);

  useEffect(() => {
    if (chrome?.tabs?.query) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }).then((query) => {
        const [tab] = query;
        setTab(new URL(tab.url));
      });
    }
  }, [])

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
            onChange={({ target }) => setFilter(target.value)}
          />
        </label>
      </div>
      <div>
        {
          local?.length
            ? <p className="cursor-default text-[#e1e243] text-lg font-medium leading-normal line-clamp-1 pr-4 ml-4 mr-4">
                {getMessage('TAB_TITLES', [tab?.host])}
              </p>
            : null
        }
        {
          local?.filter(slug => {
            const { name } = database[slug];
            return name.toLowerCase().includes(filter.toLowerCase())

          }).map(manhuaMap(database, setter))
        }
        {
          local?.length
            ? <hr className='border-gray-800 dark:border-[#e1e243] mb-2 ml-4 mr-4' />
            : null
        }
        {
          list?.filter(slug => {
            const { name } = database[slug];
            return name.toLowerCase().includes(filter.toLowerCase())

          }).map(manhuaMap(database, setter))
        }
      </div>
    </>
  )
}