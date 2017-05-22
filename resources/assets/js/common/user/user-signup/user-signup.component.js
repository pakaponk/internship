import templateUrl from './user-signup.html'
import swal from 'sweetalert'

function extractValidationErrorMessages(errors){
	return Object.values(errors)
	.map(inputErrors => inputErrors.reduce(concatStringLine))
	.reduce(concatStringLine)
}

function concatStringLine(lines, newLine){
	return `${lines}\n${newLine}`
}

export const UserSignupComponent = {
	templateUrl,
	controller: class UserSignupComponent{
		constructor($log, $state, UserService){
			'ngInject'
			this.$log = $log
			this.$state = $state

			this.UserService = UserService
		}

		signup(user){
			this.UserService.create(user)
			.then(() => {
				swal({
					type: "success",
					title: "Congratulation!",
					text: 'Your account have been created.'
				}, () => {
					this.$state.go('user.signin')
				})
			})
			.catch((error) => {
				switch(error.status){
					case 422:
						swal({
							type: "error",
							title: "Oop! Form Validation failed.",
							text: extractValidationErrorMessages(error.data)
						})
						break
					default:
						swal({
							type: "error",
							title: `${error.status}: Oop! Something went wrong.`,
							text: error.data.message
						})
						break
				}
			})
		}
	}
}