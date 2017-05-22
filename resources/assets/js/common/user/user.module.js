import angular from 'angular'
import uiRouter from '@uirouter/angularjs'

import { UserSignupModule } from './user-signup/user-signup.module'
import { UserSigninModule } from './user-signin/user-signin.module'
import { UserPhotosModule } from './user-photos/user-photos.module'

import { UserService } from './user.service'

export const UserModule = angular.module('common.user', [
	uiRouter,
	UserSignupModule,
	UserSigninModule,
	UserPhotosModule
])
.service('UserService', UserService)
.config(($stateProvider) => {
	'ngInject'
	$stateProvider.state('user', {

	})
})
.name