import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IUser } from '@app/models/users.model';
import { UserService } from '@app/services/user.service';
 

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [UserService]
})
export class CardsComponent implements OnInit {
  users$ = this.userService.users$;
  callState$ = this.userService.callState$;

  trackByFn: TrackByFunction<IUser> =
    (index, item) => item.id;

  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.userService.loadUsersWithSuccess();
    
  }

  onDelete(id: number) {
    this.userService.delateUser(id);
  }

}
