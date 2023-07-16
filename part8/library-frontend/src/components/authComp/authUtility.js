
export function isAuthorized(){
    const authorization = localStorage.getItem('authorization')
    return authorization;
}