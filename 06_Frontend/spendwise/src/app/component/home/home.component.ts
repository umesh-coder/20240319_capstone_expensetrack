import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { BusinessDataService } from '../../services/business-data.service';
import { AlertBoxComponent } from '../../shared/alert-box/alert-box.component';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { CreateGroupDialogComponent } from '../splitwise/create-group-dialog/create-group-dialog.component';
import { groupService } from '../../services/group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogging: any;
  app_version: any;
  groups: any[] = [];

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public businessData: BusinessDataService,
    public groupService : groupService
  ) {}

  
  ngOnInit(): void {
    const token = sessionStorage.getItem('LEAD_ID');
    this.authService.authAfterReferesh(true, token);
    this.app_version = sessionStorage.getItem('Version');
    console.log(this.groups)
  }
  onAdd() {
    this.businessData.onNavigate('home');
  }
  Profile() {
    this.openDialog();
  }
  openDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '600px',
    });
  }
  onLogout() {
    this.dialog.open(AlertBoxComponent, {
      data: { type: 'alert' },
    });
  }
  onGithub() {
    this.businessData.onGithub();
  }
  onLinkedin() {
    this.businessData.onLinkedin();
  }

  groupdetails(): void {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.componentInstance.groupCreated.subscribe((group: any) => {
      console.log('Group created', group);
      this.groups.push(group);
    });
  }
}
