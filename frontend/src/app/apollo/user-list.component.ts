import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      age
    }
  }
`;

@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users">
      {{ user.name }} - {{ user.email }}
    </div>
  `,
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<any>({
        query: GET_USERS,
      })
      .valueChanges.subscribe(({ data }) => {
        this.users = data.getUsers;
      });
  }
}
