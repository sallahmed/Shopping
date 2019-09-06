import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserSearchPipe', pure: false })
export class UserSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(user => {
        // if (user.profile.name) {
       if (user.nom) {
          // return user.profile.name.search(searchText) !== -1;
            return user.nom.search(searchText) !== -1;
        }
        else{
          // return user.username.search(searchText) !== -1;
            return user.nom.search(searchText) !== -1;
        }
      });
    }
  }
}