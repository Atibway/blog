

import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'


const CoursesPage = async() => {
  const user = await currentUser()
if(!user){
return redirect('/')
}

    if(user?.role === "USER"){
      redirect("/")
    }
const courses = await db.course.findMany({
  where: {
    userId: user.id
  },
  orderBy: {
    createdAt: "desc"
  }
})
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={courses} />

  </div>

  )
}

export default CoursesPage