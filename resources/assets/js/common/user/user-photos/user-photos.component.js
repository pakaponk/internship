import templateUrl from './user-photos.html'
import swal from 'sweetalert'

export const UserPhotosComponent = {
	templateUrl,
	bindings: {
		user: '<',
		photos: '<'
	},
	controller: class UserPhotosComponent{
		constructor(UserService, PhotoService){
			'ngInject'
			this.UserService = UserService
			this.PhotoService = PhotoService
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

		handleDeletePhoto(photo){
			swal({
				type: "warning",
				title: "Are you sure that you want to delete this photo?",
				text: "Please note that this action cannot be undone",
				showCancelButton: true,
				confirmButtonColor: '#5cb85c',
				confirmButtonText: 'Yes, Delete it!',
				cancelButtonText: 'No, cancel plx!',
			}, () => {
				this.PhotoService.delete(photo.id)
				.then(() => {
					const deletedPhoto = photo
					this.photos = this.photos.filter(photo => photo.id != deletedPhoto.id)
				})
				.catch((error) => {
					switch(error.status){
						case 403:
							swal({
								type: "error",
								title: "Oop! Forbidden",
								text: "You are NOT allowed to upload photo in place of another person."
							})
							break
						case 401:
							swal({
								type: "error",
								title: "Oop! Unauthenticated",
								text: error.data.message
							})
							break
					}
				})
			})
		}
	}
}