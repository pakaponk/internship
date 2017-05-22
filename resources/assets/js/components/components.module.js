import angular from 'angular'

import { MenubarModule } from './menubar/menubar.module'
import { PhotoCardModule } from './photo-card/photo-card.module'

export const ComponentsModule = angular.module('instagram.components', [
	MenubarModule,
	PhotoCardModule
])
.name