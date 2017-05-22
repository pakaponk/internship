import angular from 'angular'
import uiRouter from '@uirouter/angularjs'

import { UserSignupComponent } from './user-signup.component'

export const UserSignupModule = angular.module('common.user.signup', [
	uiRouter
])
.component('userSignup', UserSignupComponent)
.config($stateProvider => {
	'ngInject'
	$stateProvider.state('user.signup', {
		url: '/user/signup',
		component: 'userSignup'
	})
})
.name