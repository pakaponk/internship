import angular from 'angular'
import uiRouter from '@uirouter/angular'

import { UserService } from './user.service'

export const UserModule = angular.module('common.user', [
	uiRouter
])
.service('UserService', UserService)
.name