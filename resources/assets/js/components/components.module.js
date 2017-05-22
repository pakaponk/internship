import angular from 'angular'

import { MenubarModule } from './menubar/menubar.module'

export const ComponentsModule = angular.module('instagram.components', [
	MenubarModule
])
.name