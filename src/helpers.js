import { createContext } from 'react';

export const DataContext = createContext(null);
/*
 * Reads the JSON file inside of the gist
 */

export const getData = async (gistId, filename) =>  {
  const req = await fetch(`https://api.github.com/gists/${gistId}`);
  const gist = await req.json();
  return JSON.parse(gist?.files?.[filename]?.content ||'{}');
}

/*
 * Puts the data you want to store back into the gist
 */
export const setData = async (data, gistId, filename, token) => {
  const req = await fetch(`https://api.github.com/gists/${gistId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      files: {
        [filename]: {
          content: JSON.stringify(data),
        },
      },
    }),
  });

  const gist = await req.json();
  return JSON.parse(gist?.files?.[filename]?.content ||'{}');
}


export const slugify  = (str) => {
  return str.split(' ').map(i => i.toLowerCase()).join('-')
}