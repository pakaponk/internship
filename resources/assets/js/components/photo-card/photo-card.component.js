import templateUrl from './photo-card.html'

export const PhotoCardComponent = {
	templateUrl,
	bindings: {
		photo: '<',
		showDeleteButton: '<',
		onDelete: '&'
	},
	controller: class PhotoCardComponent{
		constructor($log){
			'ngInject'
			this.$log = $log
		}

		$onInit(){
			this.$log.info(this.photo)
		}

		delete($event){
			$event.stopPropagation()
			$event.preventDefault()

			this.onDelete()
		}
	}
}