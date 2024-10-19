

import React from 'react'

import { getUsers } from '@/data/user';
import UserManagement from './_components/Users-page';

const AllUsersPage = async() => {
  const users = await getUsers()

  return (
    <div>
<UserManagement
users={users}
/>
    </div>
  )
}

export default AllUsersPage;