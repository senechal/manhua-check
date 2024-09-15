/* eslint-disable no-undef */
import { useEffect, useState } from "react";
export const useIntl = (defaultLanguage = 'en') => {
  const { getMessage } = chrome?.i18n || {};
  const [messages, setMessages] = useState({});

  useEffect(() => {
    if(!getMessage) {
      const fetchMessages = async () => {
        const msg = await import(`../../public/_locales/${defaultLanguage}/messages.json`);
        setMessages(msg)
      }
      fetchMessages();
    }
  },[getMessage, defaultLanguage] )


  if (getMessage) {
    return { getMessage }
  }
  console.warn('App not build as extension.')
  return {
    getMessage: (msg) => {
      return messages?.[msg]?.message;
    }
  }
}