const TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN";
const GIST_ID = "YOUR_GIST_ID";
const GIST_FILENAME = "db.json";

import { createContext } from 'react';


export const suspenseWraper = (promise) => {
  let status = 'pending';
  let response;

  const suspender = promise.then(
    res => {
      status = 'success';
      response = res;
    },
    err => {
      status = 'error';
      response = err;
    }
  );
  const handler = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw response;
    },
    default: () => response
  }
  const read = () => {
    const result = handler[status] ? handler[status]() : handler.default();
    return result;
  }

  return { read }
}


export const DataContext = createContext(null);
/*
 * Reads the JSON file inside of the gist
 */

export function getData(gistId, filename) {

  const promise = fetch(`https://api.github.com/gists/${gistId}`).then(
    async (req) => {
      const gist = await req.json();
      return JSON.parse(gist?.files?.[filename]?.content || '{}');
  })
  return suspenseWraper(promise);
}

/*
 * Puts the data you want to store back into the gist
 */
export async function setData(data) {
  const req = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      files: {
        [GIST_FILENAME]: {
          content: JSON.stringify(data),
        },
      },
    }),
  });

  return req.json();
}
