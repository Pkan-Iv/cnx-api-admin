import * as Config from '../config.json' 

const authProvider = {

    // TODO
    // Get url from fera
    login: ({ username, password }) => {
        const req = new Request(Config.api.url, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' })
        })
        return fetch(req)
            .then(res => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(({ token }) => {
                localStorage.setItem('token', token)
            })
    },

    logout: () => {
        localStorage.removeItem('token')
        return Promise.resolve()
    }
}

export default authProvider