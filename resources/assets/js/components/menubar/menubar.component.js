import templateUrl from './menubar.html'

export const MenubarComponent = {
	templateUrl,
	controller: class MenubarComponent{
		constructor($state, UserService){
			this.$state = $state
			this.UserService = UserService
		}

		$onInit(){
			this.UserService.current()
			.catch(() =>{

			})
		}

		logout(){
			this.UserService.logout()
			.then(() => {
				this.UserService.setUser(null)
				this.$state.go('photo.index')
			})
			.catch(() => {

			})
		}
	}
}