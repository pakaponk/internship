import angular from 'angular'

import { UserModule } from './user/user.module' 
import { PhotoModule } from './photo/photo.module'

export const CommonModule = angular.module('instagram.common', [
	UserModule,
	PhotoModule
])
.name