import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Subject, takeUntil } from 'rxjs';

import { IUser } from '@app/models/users.model';
import { UserService } from '@app/services/user.service';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [UserService]
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _destroy = new Subject<void>();

  readonly displayedColumns: string[];
  readonly dataSource: MatTableDataSource<IUser>;

  callState$ = this.userService.callState$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService
  ) {
    this.displayedColumns = ['id', 'username', 'email', 'age', 'company', 'delete'];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.userService.loadUsersWithSuccess();

    this.userService.users$
      .pipe(takeUntil(this._destroy))
      .subscribe((users) => {
        this.dataSource.data = users;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(id: number) {
    this.userService.delateUser(id);
  }
}
