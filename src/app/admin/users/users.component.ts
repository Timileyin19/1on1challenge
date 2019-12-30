import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  myUser;
  updateUser: any = {};

  constructor(private userService: UserService, private aletify: AlertifyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    })
  }

  userDetail(id) {
    this.router.navigate(['/admin/user/', + id]);
  }

  getUser(id) {
    this.userService.getUser(id)
      .subscribe((res) => {
        this.getUserDetail(res);
      }, error => {
        this.aletify.error('Unable to Fetch User\'s Detials');
      });
    
  }

  getUserDetail(user) {
    this.myUser = user;
  }

  updateUserDetails() {
    this.userService.updateUser(this.myUser)
      .subscribe( res => {
        this.aletify.success('Successfully updated ' + this.myUser.username + '\'s Record');
      }, error => {
        this.aletify.error(error);
      }, () => {
        location.reload();
      })
  }

  deleteUser(id) {
    this.aletify.confirm('Are you sure you want to delete this Record?', () => {
      this.userService.deleteUser(id)
        .subscribe(() => {
          // take the User away from the UI immmediately
          this.users.splice(this.users.findIndex(u => u.id === id), 1);
          this.aletify.message('User\'s Record has been deleted successfully');
        }, error => {
          this.aletify.error('Failed to Delete, please try again');
        })

    })
  }

}
