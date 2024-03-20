import { userService } from "../service/userService.js"
import { userHelper } from "../utility/userHelper.js";



export async function showLogout(ctx){
   await userService.logout();
   userHelper.clearUserData();
   ctx.updateNav();
   ctx.goTo("/");
}