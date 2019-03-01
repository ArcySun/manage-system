import Cookies from 'js-cookie';

const TokenKey = 'Authorization';
const authToken = {
    TokenKey: TokenKey,
    getToken: function () {
        return Cookies.get(TokenKey)
    },
    setToken: function (token) {
        return Cookies.set(TokenKey, token)
    },
    removeToken: function () {
        return Cookies.remove(TokenKey);
    }
};

export default authToken;
