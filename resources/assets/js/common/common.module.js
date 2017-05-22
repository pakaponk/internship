import angular from 'angular'

import { UserModule } from './user/user.module' 

export const CommonModule = angular.module('instagram.common', [
	UserModule
])
.name