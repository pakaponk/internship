import angular from 'angular'
import ngFileUpload from 'ng-file-upload'

import { CommonModule } from './common/common.module'
import { ComponentsModule } from './components/components.module'

import { AppComponent } from './app.component'

import '../css/style.css'

angular.module('instagram', [
	ComponentsModule,
	CommonModule,
	ngFileUpload
])
.component('app', AppComponent)
.config(['$locationProvider', ($locationProvider) => {
	$locationProvider.html5Mode(true)
}])