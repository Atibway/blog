import { currentRole, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(
    req: Request,
    {params}:{
    req: Request
    params:{userId: string}
}){
    try {
       const loggedInUser = await currentUser()
       const UserRole = await currentRole()
       const {role} = await req.json()


       if(!loggedInUser){
        return new NextResponse("unauthorized")
       }
       if(UserRole === "USER"){
        return new NextResponse("unauthorized")
       }
       if(loggedInUser.email !== "ainebyoonaatiidu@gmail.com"){
        return new NextResponse("unauthorized")
       }

       const UserInDb = await db.user.findUnique({
        where:{
            id: params.userId
        }
       })

       if(!UserInDb){
        return new NextResponse("There is No such User")
       }

       const UpdatedUser = await db.user.update({
        where:{
            id: params.userId
        },
        data:{
         role: role   
        }
       })
       return NextResponse.json(UpdatedUser);
    } catch (error) {
        console.log("[USER_ID]", error);
    
    return new  NextResponse("Internal Error", {status:500})
    }
}