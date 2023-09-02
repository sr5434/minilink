'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [ link, setLink ] = useState("");
  const [ shortLink, setShortLink ] = useState("");
  const handleInput = async (e:any) => {
    const fieldValue = e.target.value;

    await setLink(fieldValue);
  }

  const submitHandler = async (e: any) => {
    e.preventDefault()
    let res = await fetch('https://minilink-rosy.vercel.app/api/shorten', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `{"link":"${link}"}`
    });
    let resJson = await res.json();
    await setShortLink(`https://minilink-rosy.vercel.app/l/${resJson.linkID}`)
  }

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <h1 className="text-5xl font-extrabold">Minilink</h1>
      <form onSubmit={submitHandler}>
        <label className="block mb-2 pt-6 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">Paste your link here:</label>
        <textarea
        name="linkInp"
        placeholder='https://example.com/'
        value={link}
        onChange={handleInput}
        className="block p-2.5 w-full h-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button 
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-lg">
          Make it shorter
        </button>
      </form>
      <a href={shortLink} className='font-medium text-blue-600 dark:text-blue-500 underline'>{shortLink}</a>
    </div>
  )
}
