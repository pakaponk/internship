import angular from 'angular'

export class UserService{
	constructor($http, $log, Upload){
		'ngInject'
		this.$http = $http
		this.$log = $log

		this.Upload = Upload
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

	login(user){
		return this.$http({
			method: 'POST',
			url: '/web/auth/login',
			data: user
		})
		.then(successResponse => this.handleSuccess(successResponse))
		.catch(errorResponse => this.handleError(errorResponse))
	}

	logout(){
		return this.$http({
			method: 'GET',
			url: '/web/auth/logout',
		})
		.then(successResponse => this.handleSuccess(successResponse))
		.catch(errorResponse => this.handleError(errorResponse))
	}

	current(){
		if (angular.isDefined(this.user))
		{
			if (this.user)
			{
				return Promise.resolve(this.user)
			}
			else
			{
				return Promise.reject({
					status: 401,
					data: {
						success: false,
						error: "Unauthorized"
					}
				})
			}
		}
		else
		{
			return this.$http({
				method : 'GET',
				url : '/web/auth/current'
			})
			.then((successResponse) => this.handleSuccess(successResponse))
			.then((user) => {
				this.setUser(user)
				return user
			})
			.catch((errorResponse) => {
				this.setUser(null)
				return this.handleError(errorResponse)
			})
		}
	}

	getUser(){
		return this.user
	}

	setUser(user){
		if (this.user && user)
		{
			Object.assign(this.user, user)
		}
		else
		{
			this.user = user
		}
	}

	createPhoto(id, photo){
		return this.Upload.upload({
			url: `web/users/${id}/photos`,
			data: photo,
		})
		.then(successResponse => this.handleSuccess(successResponse)
		, errorResponse => this.handleError(errorResponse)
		, (event) => {
			let progressPercentage = parseInt(100.0 * event.loaded / event.total)
			if (event.config.data.new_avatar)
				this.$log.info(`progress: ${progressPercentage} % Photo`)
		})
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