export class UserService{
	constructor($http, $log){
		'ngInject'
		this.$http = $http
		this.$log = $log
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