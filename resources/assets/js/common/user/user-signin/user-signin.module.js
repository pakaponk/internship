import angular from 'angular'
import uiRouter from '@uirouter/angularjs'

import { UserSigninComponent } from './user-signin.component'

export const UserSigninModule = angular.module('common.user.signin', [
	uiRouter
])
.component('userSignin', UserSigninComponent)
.config($stateProvider => {
	'ngInject'
	$stateProvider.state('user.signin', {
		url: '/user/signin',
		component: 'userSignin'
	})
})
.name