export interface CustomError extends Error {
    response:object,
    method:string,
    url:string,
    data:string,
    code:string,
}
  