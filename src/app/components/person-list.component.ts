import * as angular from 'angular';


export let PersonListComponent = {
  selector: 'personList',
  template: `
<div class="col-md-12" >
	<div class="row"
	     infinite-scroll="$ctrl.contacts.loadMore()"
	     infinite-scroll-immediate-check="false"
	     infinite-scroll-distance="1"
			>
		<card ng-repeat="person in $ctrl.contacts.persons track by person.id"
				     [user]="person" >
		</card>
	</div >
	<div ng-show="$ctrl.contacts.persons.length == 0 && !$ctrl.contacts.isLoading" >
		<div class="alert alert-info" >
			<p class="text-center" >No results found for search term '{{ $ctrl.search }}'</p >
		</div >
	</div >
	<spinner [is-loading]="$ctrl.contacts.isLoading"
	            message="Loading..." >
	</spinner >
</div >
`,
  bindings: {},
  controller: class PersonListController {
    public contacts = null;

    constructor(ContactService) {
      this.contacts = ContactService;
    }
  }
};

angular
    .module('codecraft')
    .component(PersonListComponent.selector, PersonListComponent); 
    