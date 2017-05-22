import angular from 'angular'
import uiRouter from '@uirouter/angularjs'

import { PhotoCreateModule  } from './photo-create/photo-create.module'
import { PhotoIndexModule } from './photo-index/photo-index.module'
import { PhotoInfoModule } from './photo-info/photo-info.module'

import { PhotoService } from './photo.service'

export const PhotoModule = angular.module('common.photo', [
	uiRouter,
	PhotoCreateModule,
	PhotoIndexModule,
	PhotoInfoModule
])
.service('PhotoService', PhotoService)
.config($stateProvider => {
	'ngInject'
	$stateProvider.state('photo', {
		
	})
})
.name