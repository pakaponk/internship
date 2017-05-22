import angular from 'angular'

import { CommonModule } from './common/common.module'
import { ComponentsModule } from './components/components.module'

import { AppComponent } from './app.component'

angular.module('instagram', [
	ComponentsModule,
	CommonModule
])
.component('app', AppComponent)
.config(['$locationProvider', ($locationProvider) => {
	$locationProvider.html5Mode(true)
}])