"use client"

import {  usePathname, useRouter } from "next/navigation"


import { LogOut as Out, LogOutIcon } from "lucide-react"
import Link from "next/link"
import { useCurrentRole } from "@/hooks/use-current-role"

import { useCurrentUser } from "@/hooks/use-current-user"
import { HopIcon, Menu } from "lucide-react"


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { signOut } from "next-auth/react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/modeToggler"



export const SingleNavbarRoutes = ({
  userId
}:{userId: string}) => {
  const pathname = usePathname();

const userRole = useCurrentRole()
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter")
const user = useCurrentUser()
const router = useRouter()

const onclick = ()=>{
   signOut()
   router.push("/")
   router.refresh()
}

  return (
    <div>
<header className="px-4 lg:px-6 flex items-center h-[80px] dark:bg-primary-foreground dark:text-white justify-between ">
<Link className="flex items-center justify-center" href="/">
 <HopIcon/>
  <span className="text-primary">FcBlogs</span>
</Link>

<nav className="ml-auto hidden lg:flex  gap-4 sm:gap-6">
  <div className="flex space-x-4 mt-2">

  <Link className="text-sm font-medium hover:underline underline-offset-4 mt-[1px]" href={`/blog/${userId}`}>
    Home
  </Link>
  {userRole === "ADMIN" && user?.email ==="ainebyoonaatiidu@gmail.com" && (
    <Link className="text-sm font-medium hover:underline underline-offset-4 mt-[1px]" href="/settings">
    Users
  </Link>
  )}
  <Link className="text-sm font-medium hover:underline underline-offset-4 mt-[1px]" href={`/blog/${userId}/about`}>
    About
  </Link>
  {userRole === "ADMIN" && (
        <>
        <div>
          {isTeacherPage || isPlayerPage? (
         <Link
         className="text-sm mt-1 flex font-medium hover:underline underline-offset-4"
         href={`/blog/${userId}`}
         >
       
          <Out className="h-4 w-4 mr-2"/>
          Exit
  
         </Link>
      ): (
        <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        href={"/teacher/courses"}
        >

  Create Blog

        </Link>
      )}
        </div>
        </>
      )}
  <Link className="text-sm font-medium hover:underline underline-offset-4 mt-1" href={`/blog/${userId}/posts`}>
    Posts
  </Link>
  </div>
  {user?.image && (

<>
<Avatar className="mb-1">
    <AvatarImage
    
    src={user?.image || ""} />
  </Avatar>
    </>
)}
<div>
          {user? (
           
       <Button
       onClick={onclick}
       variant={"ghost"}>
              <span
              className="flex mt-2"
              >
                    Logout
                    <LogOutIcon className="h-4 w-4 ml-1 mt-1 text-destructive"/>
              </span>
       </Button>
            
                
          ):(
            <Link
          href={"/auth/login"}
            >
            
            <Button
            variant={"ghost"}
            >
              Login
            </Button>
            </Link>
          )}
        </div>
</nav>
<div className="flex space-x-3">
  <div className="lg:mt-[-15px] lg:ml-2">

<ModeToggle/>
  </div>
<Sheet>
  <SheetTrigger asChild>
    <span className="lg:hidden">
      <Menu className="h-6 w-6" />
      <span className="sr-only">Toggle navigation menu</span>
    </span>
  </SheetTrigger>
  <SheetContent className="dark:bg-primary-foreground dark:text-white bg-white" side="right">
    <SheetHeader>
      <SheetTitle>Routes</SheetTitle>
      <SheetDescription>Navigate through the blog</SheetDescription>
    </SheetHeader>
    <nav className="flex mt-2 flex-col gap-4 w-full ">
      <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
      <Button
      className="w-full"
      >
        Home
      </Button>
      </Link>
      <Link className=" text-sm font-medium hover:underline underline-offset-4" href="/about">
      <Button className="w-full">

        About
      </Button>
      
      </Link>
      <div>
      {userRole === "ADMIN" && user?.email ==="ainebyoonaatiidu@gmail.com" && (
    <Link className="text-sm font-medium hover:underline underline-offset-4 mt-[1px]" href="/settings">
    <Button className="w-full">

Users
</Button>
  </Link>
  )}
      </div>
      <Link className="text-sm font-medium hover:underline underline-offset-4" href="/blogs">
      <Button className="w-full">
        Blogs
      </Button>
      </Link>
    
      {userRole === "ADMIN" && (
        <div>
          {isTeacherPage || isPlayerPage? (
         <Link
         className="text-sm mt-1 flex font-medium hover:underline underline-offset-4"
         href={"/"}
         >
       <Button className="w-full">

          <Out className="h-4 w-4 mr-2"/>
          Exit
       </Button>
  
         </Link>
      ): (
        <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        href={"/teacher/courses"}
        >
<Button className="w-full">

  Create Blog
</Button>

        </Link>
      )}
        </div>
      )}
     
     
      <div>
          {user? (
    
              <Button
              onClick={onclick}
              className="flex mt-2 w-full"
              >
                    Logout
                    <LogOutIcon className="h-4 w-4 ml-1 mt-1 text-destructive"/>
              </Button>
       
         
                
          ):(
            <Link
          href={"/auth/login"}
            >
            
            <Button className="w-full">
              Login
            </Button>
            </Link>
          )}
        </div>

      
    </nav>
  </SheetContent>
</Sheet>
</div>
</header>
    </div>
  )
}
