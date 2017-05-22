import templateUrl from './user-photos.html'

export const UserPhotosComponent = {
	templateUrl,
	bindings: {
		user: '<',
		photos: '<'
	},
	controller: class UserPhotosComponent{
		constructor(UserService){
			'ngInject'
			this.UserService = UserService
		}

		$onInit(){
			this.isOwner = this.user.id == this.UserService.user.id

			if (this.isOwner)
			{
				this.photos = this.photos.map((photo) => {
					photo.user = this.UserService.user
					return photo
				})
			}
		}
	}
}