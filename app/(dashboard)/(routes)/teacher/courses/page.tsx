

import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { BlogDescriptionForm } from './_components/DescriptionForm'


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

const userDetails = await db.user.findUnique({
  where:{
    id: user.id
  }
})
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 gap-7">
      <BlogDescriptionForm
      initialData={userDetails!}
      />
    <DataTable columns={columns} data={courses} />

  </div>

  )
}

export default CoursesPage