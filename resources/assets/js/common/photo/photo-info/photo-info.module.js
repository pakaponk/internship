import angular from 'angular'
import uiRouter from '@uirouter/angularjs'

import { PhotoInfoComponent } from './photo-info.component'

export const PhotoInfoModule = angular.module('common.photo.info', [
	uiRouter
])
.component('photoInfo', PhotoInfoComponent)
.config(($stateProvider) => {
	'ngInject'
	$stateProvider.state('photo.info', {
		url: '/photo/:id',
		component: 'photoInfo',
		resolve: {
			photo: ($transition$, PhotoService) => 
                PhotoService.get($transition$.params().id)
                .then(photo => photo)
		}
	})
})
.name