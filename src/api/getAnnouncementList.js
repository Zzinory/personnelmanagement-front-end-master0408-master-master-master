import request from "./index";
export function getAnnouncementList(){
  return request({
    url:'/announcement/getAnnouncementList',
    method: 'get',
  })
}

export default getAnnouncementList;
