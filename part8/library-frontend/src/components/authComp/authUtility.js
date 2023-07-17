
export function isAuthorized(){
    const authorization = localStorage.getItem('userInfo')
    return authorization;
}