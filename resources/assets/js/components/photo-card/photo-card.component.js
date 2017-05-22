import templateUrl from './photo-card.html'

export const PhotoCardComponent = {
	templateUrl,
	bindings: {
		photo: '<'
	},
	controller: class PhotoCardComponent{
		constructor($log){
			'ngInject'
			this.$log = $log
		}

		$onInit(){
			this.$log.info(this.photo)
		}
	}
}