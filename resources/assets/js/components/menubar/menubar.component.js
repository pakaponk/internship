import templateUrl from './menubar.html'

export const MenubarComponent = {
	templateUrl,
	controller: class MenubarComponent{
		constructor(UserService){
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

			})
			.catch(() => {
				
			})
		}
	}
}