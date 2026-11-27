const username = "admin2"
const password = "password@123"

const db = [
    { id: 1, name: "Ram", username: "admin", password: "password@123"},
    { id: 2, name: "Sita", username: "admin2", password: "password@123"},
    { id: 3, name: "Laxman", username: "admin3", password: "password@123"},
    { id: 4, name: "Bharat", username: "admin4", password: "password@123"}
]
function login(){
const loginUser = db.find((item)=>item.username === username)

if(!loginUser){
    console.log("User with username not found");
    return;
}

if(loginUser?.password != password){
   console.log("Invalid username or password")
   return;

}

console.log({
    success: true,
    user: loginUser
})
}


login()