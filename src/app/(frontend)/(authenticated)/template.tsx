import React from 'react'
import { redirect } from 'next/navigation'
import { getUser } from './_actions/getUser'

export default async function Template(props: { children: React.ReactNode }) {
  const { children } = props
  const user = await getUser()
  if (!user) {
    redirect('/login')
    return null
  }

  return <div>{children}</div>
}
