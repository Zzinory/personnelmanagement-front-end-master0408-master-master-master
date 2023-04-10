import request from "./index";
export function getDownloadFile(fileName){
  return request({
    url:'/file/download/16d53f9a99c84ea583e595d3b66c9fce.pdf',
    method: 'get',
    data:{fileName}
  })
}

export default getDownloadFile;
