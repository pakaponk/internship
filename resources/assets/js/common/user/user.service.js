export class UserService{
	constructor($http, $log){
		'ngInject'
		this.$http = $http
		this.$log = $log
	}

	create(user){
		return this.$http({
			method: 'POST',
			url: '/web/users',
			data: user
		})
		.then(successResponse => this.handleSuccess(successResponse))
		.catch(errorResponse => this.handleError(errorResponse))
	}

	handleSuccess(response){
		if (response.data.success){
			return response.data.content
		}
		else{
			return Promise.reject(response)
		}
	}

	handleError(response){
		this.$log.error('DataService: ', response)
		return Promise.reject(response)
	}
}