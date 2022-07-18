import * as angular from 'angular';

import {
	Inject,
	Component,
} from "@angular/core";

import { downgradeComponent } from "@angular/upgrade/static";
import { ContactService } from "../services/contact.service";

@Component({
	selector: 'personList',
	template: `
<div class="col-md-12" >
	<div class="row"
		infiniteScroll
    	[infiniteScrollDistance]="2"
		[immediateCheck]="false"
		[infiniteScrollThrottle]="100"
		(scrolled)="contacts.loadMore()"
			>
		<card  *ngFor="let person of contacts.persons"
			[user]="person" >
		</card>
	</div >
	<div *ngIf="contacts.persons.length == 0 && !contacts.isLoading">
		<div class="alert alert-info" >
			<p class="text-center" >No results found for search term '{{ contacts.search }}'</p >
		</div >
	</div >
	<spinner [isLoading]="contacts.isLoading" 
		message="Loading..." >
	</spinner >
</div >
`})
export class PersonListComponent {
	constructor( @Inject(ContactService) public contacts: ContactService) {
	}
}

angular
    .module('codecraft')
    .directive("personList", downgradeComponent({
        component: PersonListComponent
    }));
