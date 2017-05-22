import templateUrl from './photo-info.html'
import swal from 'sweetalert'

function extractValidationErrorMessages(errors){
	return Object.values(errors)
	.map(inputErrors => inputErrors.reduce(concatStringLine))
	.reduce(concatStringLine)
}

function concatStringLine(lines, newLine){
	return `${lines}\n${newLine}`
}

export const PhotoInfoComponent = {
	templateUrl,
	bindings: {
		photo: '<'
	},
	controller: class PhotoInfoComponent{
		constructor($state, PhotoService, UserService){
			'ngInject'
			this.$state = $state

			this.PhotoService = PhotoService
			this.UserService = UserService
		}

		createComment(comment){
			this.PhotoService.createComment(this.photo.id, comment)
			.then((comment) => {
				comment.user = this.UserService.user
				this.photo.comments.push(comment)
				this.comment.text = ""
			})
			.catch((error) => {
				switch(error.status){
					case 422:
						swal({
							type: "error",
							title: "Oop! Form Validation failed",
							text: extractValidationErrorMessages(error.data)
						})
						break
					case 401:
						swal({
							type: "error",
							title: "Oop! Unauthenticated",
							text: "Please sign in before commenting a photo"
						}, () => {
							this.$state.go('user.signin')
						})
						break
				}
			})
		}
	}
}