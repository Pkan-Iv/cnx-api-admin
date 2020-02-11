export default {
	login ({ username, password }) {
		localStorage.setItem( 'username', username )
		return Promise.resolve()
	},

	logout () {
		localStorage.removeItem( 'username' )
		return Promise.resolve()
	},

	checkAuth () {
		const check = localStorage.getItem( 'username' )
		return check ? Promise.resolve() : Promise.reject()
	},

	checkError (error) {
		const status = error.status

		if (status === 401 || status === 403) {
			localStorage.removeItem( 'username' )
			return Promise.reject()
		}

		return Promise.resolve()
	},

	getPermissions (params) {
		return Promise.resolve()
	}
}
