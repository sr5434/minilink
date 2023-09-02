'use client';
import { redirect } from 'next/navigation' 

type Params = {
  params:{
    id: string
  }
}

export default async function Page({ params: { id } }: Params) {
  const res = await fetch('minilink-rosy.vercel.app/api/getRedirect', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `{"linkID": "${id}"}`
  });
  const resJSON = await res.json();
  redirect(resJSON.redirectURL)
  return <p>You shouldnt be here.</p>
}
