
"use client"

import { useState } from "react"
import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import toast  from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"

interface UserProps {
    users: User[] | null
}


export default function UserManagement({
users
}:UserProps) {
  
const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  
  const handleRoleChange = async (userId: string, newRole: 'ADMIN' | 'USER') => {
    try {
        setIsLoading(true)
      await axios.patch(`api/users/${userId}`, { role: newRole })
      router.refresh()
      toast.success("Role Updated")
    } catch (error) {
      console.error("Failed to update user role:", error)
      toast.error("Failed to update user role. Please try again.")
    } finally{
        setIsLoading(false)
    }
  }

  if (isLoading) {
    router.refresh()
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value: 'ADMIN' | 'USER') => handleRoleChange(user.id, value)}
                    defaultValue={user.role}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}