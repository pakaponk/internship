import angular from 'angular'
import uiRouter from '@uirouter/angularjs'

import { UserSignupModule } from './user-signup/user-signup.module'

import { UserService } from './user.service'

export const UserModule = angular.module('common.user', [
	uiRouter,
	UserSignupModule
])
.service('UserService', UserService)
.config(($stateProvider) => {
	'ngInject'
	$stateProvider.state('user', {

	})
})
.name