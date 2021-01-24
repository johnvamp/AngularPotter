import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from "../../shared/shared.service"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';

export interface MembersData {
  name: string;
  lastname: string;
  patronus: string;
  ancestry: string;
  Profile: string;
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'lastname', 'patronus', 'ancestry', 'profile'];
  dataSource = new MatTableDataSource(String['']);
  houseMembers = new MatTableDataSource(String['']);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  membersList = [{}];
  constructor(private shared: SharedService, public dialog: MatDialog) { }

  ngOnInit() {
    this.shared.shieldMembers$
      .subscribe(
        members => {
          this.membersList = members;
          this.dataSource = this.fillTable(this.membersList);
        }
      );
  }

  fillTable(members) {
    this.houseMembers = new MatTableDataSource(String['']);
    members.forEach(member => {
      if (member.name) {
        this.houseMembers.data.push(member);
      }
    });
    return this.houseMembers;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(profile) {
    const dialogRef = this.dialog.open(ProfileComponent, { data: { memberProfile: profile } });
  }
}

