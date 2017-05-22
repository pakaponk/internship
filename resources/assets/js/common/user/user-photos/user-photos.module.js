import angular from 'angular'
import uiRouter from '@uirouter/angularjs'

import { UserPhotosComponent } from './user-photos.component'

export const UserPhotosModule = angular.module('common.user.photos', [
	uiRouter
])
.component('userPhotos', UserPhotosComponent)
.config($stateProvider => {
	'ngInject'
	$stateProvider.state('user.photos', {
		url: '/user/:id/photos',
		component: 'userPhotos',
		resolve: {
			user: ($transition$, UserService) => {
				const userId = $transition$.params().id
				if (UserService.user && userId == UserService.user.id)
				{
					return UserService.current()
					.catch(() => {

					})
				}
				else
				{
					return UserService.get(userId)
				}
			},
			photos: ($transition$, UserService) => 
				UserService.photos($transition$.params().id)
				.catch((error) => {
					switch(error.status){
						case 404:
							break
					}
				})
			
		}
	})
})
.name