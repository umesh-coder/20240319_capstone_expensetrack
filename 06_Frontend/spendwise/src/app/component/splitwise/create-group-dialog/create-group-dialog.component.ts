import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { groupService } from '../../../services/group.service';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrl: './create-group-dialog.component.scss',
})
export class CreateGroupDialogComponent {
  groupName: string = '';
  groupMembers: string[] = [];

  @Output() groupCreated = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
    public groupService: groupService
  ) {}

  addMember(member: string): void {
    if (member.trim() !== '') {
      this.groupMembers.push(member.trim());
    }
  }

  removeMember(index: number): void {
    this.groupMembers.splice(index, 1);
  }

  createGroup(): void {
    const group = {
      name: this.groupName,
      members: this.groupMembers,
      expenses: [], // Assuming expenses is initially an empty array
    };

    this.groupService.createGroup(group).subscribe({
      next: (response) => {
        console.log('Group created successfully:', response);
        // Handle success, if needed
      },
      error: (error) => {
        console.error('Error creating group:', error);
        // Handle error, if needed
      },
    });
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
