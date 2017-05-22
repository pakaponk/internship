import angular from 'angular'
import uiRouter from '@uirouter/angularjs'

import { PhotoIndexComponent } from './photo-index.component'

export const PhotoIndexModule = angular.module('photo.index', [
	uiRouter
])
.component('photoIndex', PhotoIndexComponent)
.config($stateProvider => {
	'ngInject'
	$stateProvider.state('photo.index', {
		url: '/photos',
		component: 'photoIndex',
		resolve: {
			photos: (PhotoService) => PhotoService.all()
		}
	})
})
.name