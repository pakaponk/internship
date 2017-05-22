import templateUrl from './user-signin.html'
import swal from 'sweetalert'

function extractValidationErrorMessages(errors){
	return Object.values(errors)
	.map(inputErrors => inputErrors.reduce(concatStringLine))
	.reduce(concatStringLine)
}

function concatStringLine(lines, newLine){
	return `${lines}\n${newLine}`
}
export const UserSigninComponent = {
	templateUrl,
	controller: class UserSigninComponent{
		constructor($log, $state, UserService){
			'ngInject'
			this.$log = $log
			this.$state = $state

			this.UserService = UserService
		}

		signin(user){
			this.UserService.login(user)
			.then((user) => {
				this.UserService.setUser(user)
				this.$state.go('home')
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
					case 401:
						swal({
							type: "error",
							title: "Oop! Unauthenticated",
							text: error.data.message
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