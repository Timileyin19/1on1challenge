import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  tableColumns  :  string[] = ['id', 'fullName', 'username', 'gender', 'city', 'country', 'age', 'lastActive', 'edit', 'viewDetails', 'delete'];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  users: User[];
  myUser;
  updateUser: any = {};
  searchKey: string;

  constructor(private userService: UserService, private aletify: AlertifyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });

    this.dataSource = new MatTableDataSource(this.users);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
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
