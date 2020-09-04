import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Form: FormGroup;
    currentUser: User;
    users: User[] = [];
    userBookings: any;
    userBookingsFilter: any;
    searchControl:string="";
    typeSearchControl:string="";
    typesSearch = [
       'Like', 'Greater than', 'Smaller than'
    ] 

    constructor(private fb: FormBuilder, private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
       /*  this.loadAllUsers(); */
        this.loadUserBookings(this.currentUser);
        this.Form = this.fb.group({
            search: ['', Validators.required],
            type: ['', Validators.required],
          });
    }

    onTypeChange() {
        //console.log(this.Form.value.type);
        this.typeSearchControl = this.Form.value.type;
        this.setQuery();
    }

    onSearchChange() {
        //console.log(this.Form.value.search);
        this.searchControl = this.Form.value.search;
        this.setQuery();
    }

    setQuery(){
        let query = this.searchControl;
        let filter;

        switch (this.typeSearchControl) {
            case 'Like':
                filter = this.userBookingsFilter.filter(function (el:any) {
                    return el.bookingId.toString().indexOf(query) > -1 || el.bookingPrice.toString().indexOf(query) > -1;
                });
              break;
            case 'Greater than':
                //>=
                filter = this.userBookingsFilter.filter(function (el:any) {
                    return el.bookingId >= query || el.bookingPrice >= query;
                    //return el.bookingId >= query;
                });
            case 'Smaller than':
                //<=
                filter = this.userBookingsFilter.filter(function (el:any) {
                    return el.bookingId <= query || el.bookingPrice <= query;
                    //return el.bookingId <= query;
                });
              break;
            default:
                filter = this.userBookingsFilter.filter(function (el:any) {
                    return el.bookingId.toString().indexOf(query) > -1 || el.bookingPrice.toString().indexOf(query) > -1;
                });
        }
        console.log(query, this.typeSearchControl);
        console.log(filter, 'filter');
        if(query){
            this.userBookings = filter;
        }else{
            this.userBookings = this.userBookingsFilter;
        }
        
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    private loadUserBookings(user: any) {
        this.userService.getUserBookings(user).pipe(first()).subscribe(bookings => { 
            this.userBookings = bookings; 
            this.userBookingsFilter = bookings; 
        });
    }

}
