import templateUrl from './photo-create.html'
import swal from 'sweetalert'

function extractValidationErrorMessages(errors){
	return Object.values(errors)
	.map(inputErrors => inputErrors.reduce(concatStringLine))
	.reduce(concatStringLine)
}

function concatStringLine(lines, newLine){
	return `${lines}\n${newLine}`
}

export const PhotoCreateComponent = {
	templateUrl,
	bindings: {
		userId: '<'
	},
	controller: class PhotoCreateComponent{
		constructor(UserService){
			'ngInject'
			this.UserService = UserService
		}

		create(photo){
			this.UserService.createPhoto(this.UserService.user.id, photo)
			.then(() => {
				swal({
					type: "success",
					title: "Congratulation!",
					text: "Your photo have been uploaded."
				})
			})
			.catch(error => {
				switch(error.status){
					case 422:
						swal({
							type: "error",
							title: "Oop! Form Validation failed",
							text: extractValidationErrorMessages(error.data)
						})
						break
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
		}

		beforeAvatarChanged(){
			this.isAvatarChanging = true
		}

		afterAvatarChanged(){
			this.isAvatarChanging = false
		}
	}
}