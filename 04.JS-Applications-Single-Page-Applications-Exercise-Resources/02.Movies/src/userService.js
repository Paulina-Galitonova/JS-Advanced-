import {get,post,update,del} from "./requester.js"

const endPoints={
    login:"http://localhost:3030/users/login",
    register:"http://localhost:3030/users/register",
    logout:"http://localhost:3030/users/logout"

}

async function register(data){
return await post(endPoints.register,data);
}

export{
    register
}