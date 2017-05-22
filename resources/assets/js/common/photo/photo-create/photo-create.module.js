import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import ngFileUpload from 'ng-file-upload'

import { PhotoCreateComponent } from './photo-create.component'

export const PhotoCreateModule = angular.module('common.photo.create', [
	uiRouter,
	ngFileUpload
])
.component('photoCreate', PhotoCreateComponent)
.config($stateProvider => {
	'ngInject'
	$stateProvider.state('photo.create', {
		url: "/photo/create",
		component: "photoCreate",
		resolve: {
			userId: (UserService, $state) => 
				UserService.current()
				.then(user => user.id)
				.catch(error => {
					switch(error.status){
						case 401:
							$state.go('user.signin')
							break
						default:
							break  
					}
				})
		}
	})
})
.name