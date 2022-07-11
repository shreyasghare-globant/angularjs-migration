import * as angular from 'angular';

import { Inject } from "@angular/core";
import { downgradeInjectable } from "@angular/upgrade/static";

import { Contact } from "./contact.resource";

export class ContactService {
  private page = 1;
  private hasMore = true;
  private isLoading = false;
  private isSaving = false;
  private isDeleting = false;
  private selectedPerson = null;
  private persons = [];
  private search = "";
  private sorting = 'name';
  private ordering = 'ASC';

  constructor(@Inject(Contact) private contact: Contact) {
    this.loadContacts();
  }

  getPerson(email) {
    console.log(email);
    for (let person of this.persons) {
      if (person.email === email) {
        return person;
      }
    }
  }

  doSearch() {
    this.hasMore = true;
    this.page = 1;
    this.persons = [];
    this.loadContacts();
  }

  doOrder() {
    this.hasMore = true;
    this.page = 1;
    this.persons = [];
    this.loadContacts();
  }

  loadContacts() {
    if (this.hasMore && !this.isLoading) {
      this.isLoading = true;

      let params = {
        _page: this.page.toString(),
        _sort: this.sorting,
        _order: this.ordering,
        q: this.search
      };

      this.contact.query(params).then((res) => {
        console.debug(res);
        for (let person of res) {
          this.persons.push(person);
        }

        if (res.length === 0) {
          this.hasMore = false;
        }
        this.isLoading = false;
      });
    }
  }

  updateContact(person) {
    return new Promise<void>((resolve, reject) => {
      this.isSaving = true;
      this.contact.update(person).then(() => {
        this.isSaving = false;
        // this.toaster.pop("success", "Updated " + person.name);
        resolve();
      })
    })
  }

  removeContact(person) {
    return new Promise<void>((resolve, reject) => {
      this.isDeleting = true;
      this.contact.remove(person).then(() => {
        this.isDeleting = false;
        let index = this.persons.indexOf(person);
        this.persons.splice(index, 1);
        this.selectedPerson = null;
        // this.toaster.pop('success', 'Deleted ' + person.name);
        resolve();
      });
    });
  }

  createContact(person) {
    return new Promise<void>((resolve, reject) => {
      this.isSaving = true;
      this.contact.save(person).then(() => {
        this.isSaving = false;
        this.selectedPerson = null;
        this.hasMore = true;
        this.page = 1;
        this.persons = [];
        this.loadContacts();
        // this.toaster.pop('success', 'Created ' + person.name);
        resolve();
      });
    });
  }

  loadMore() {
    if (this.hasMore && !this.isLoading) {
      this.page += 1;
      this.loadContacts();
    }
  }
}

angular
  .module("codecraft")
  .factory("ContactService", downgradeInjectable(ContactService));
  