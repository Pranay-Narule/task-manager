import { createParamDecorator } from "@nestjs/common";
import { user } from "./user.entity";

// creating custom decorator 
// this func accepts two parameter 
// data which copntaince the data provided 
//\\ req which containce the rq object
export const GetUser = createParamDecorator((data, req): user => {
  // whatever we return from this function
  // is going to be set the parameter that is decorated with this decorator
    return req.user;
//in entire rq we just access user object
})