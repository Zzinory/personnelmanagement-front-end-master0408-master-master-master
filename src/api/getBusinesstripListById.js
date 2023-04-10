import request from "./index";
export function getBusinesstripListById(businesstrip){
  return request({
    url:'/businesstrip/getBusinesstripListById',
    method: 'post',
    data:businesstrip,
  })
}

export default getBusinesstripListById;
