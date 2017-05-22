import templateUrl from './photo-index.html'

export const PhotoIndexComponent = {
	templateUrl,
	bindings: {
		photos: '<'
	},
	controller: class PhotoIndexComponent{
		constructor(UserService){
			'ngInject'
			this.UserService = UserService
		}
	}
}