/**
 * Check whether the user is authenticated
 *
 * @return bool
 */
export function isAuthenticated() {
    const myCookie = document.cookie;
    return myCookie.includes('token');
}
