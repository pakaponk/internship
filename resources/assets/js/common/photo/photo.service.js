export class PhotoService{
	constructor($http, $log){
		'ngInject'
		this.$http = $http
		this.$log = $log
	}

	all(){
		return this.$http({
			method: 'GET',
			url: 'web/photos'
		})
		.then(successResponse => this.handleSuccess(successResponse))
		.catch(errorResponse => this.handleError(errorResponse))
	}

	get(id){
		return this.$http({
			method: 'GET',
			url: `web/photos/${id}`
		})
		.then(successResponse => this.handleSuccess(successResponse))
		.catch(errorResponse => this.handleError(errorResponse))
	}

	createComment(id, comment){
		return this.$http({
			method: 'POST',
			url: `web/photos/${id}/comments`,
			data: comment
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