import { apiClient,mockAuth } from "./config";



// function to handle login api 
export const loginUser=async(email,password)=>{
 try{
   let res= await apiClient.get('/users',{
    params:{email}
   })
    // checking the user 
     console.log(res)
//    checking already the user email or user exist in the database 
     let user=res.data.find(u=>u.email==email&&u.password==password)

    //  if user not exist throw an error
    if(!user){
        throw new Error ("user email and password not found")
    }

    // generate a token
    let token=mockAuth.generateToken(user)

    // save the token and user to localStorage
     localStorage.setItem('token',token)
     localStorage.setItem('user',JSON.stringify(user))

    return {user ,token}
 }catch(error){
  return error
 }

}
// function to handle Register api 
export const registerUser=async(newuser)=>{
 try {
   // checking already the user exists in the db or not
  let res= await apiClient.get('/users',{
    params:{email:newuser.email}
   }
  )

  if(res.data.length>0){
    throw new Error("user already exists")
  }

  // creating the new user
  let saveUser=await apiClient.post("/users",newuser)

      // generate a token
    let token=mockAuth.generateToken(saveUser.data)

    // save the token and user to localStorage
     localStorage.setItem('token',token)
     localStorage.setItem('user',JSON.stringify(saveUser.data))

     return {user:saveUser.data ,token}
 } catch (error) {
   return error
 }

}
// function to handle logout api 
export const logoutUser=()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}