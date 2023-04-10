import request from "./index";
export function businesstripSubmit(businesstrip){
  return request({
    url:'/businesstrip/businesstripSubmit',
    method: 'post',
    data:businesstrip,
  })
}

export default businesstripSubmit();
