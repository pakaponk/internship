import angular from 'angular'
import uiRouter from '@uirouter/angularjs'

import { PhotoCreateModule  } from './photo-create/photo-create.module'

export const PhotoModule = angular.module('common.photo', [
	uiRouter,
	PhotoCreateModule
])
.config($stateProvider => {
	'ngInject'
	$stateProvider.state('photo', {
		
	})
})
.name