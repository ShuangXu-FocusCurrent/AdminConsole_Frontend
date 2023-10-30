import service from "@/request/index";
import {LoginData} from "@/type/login";
interface loginData{
  username:String,
  password:string
}
//Login api
export function login(data:loginData){
  return service({
    url:"/login",
    method:"post",
    data
  })
}

//GoodsList api
export function getGoodsList(){
  return service({
    url:"/getGoodsList",
    method:"get"
  })
}