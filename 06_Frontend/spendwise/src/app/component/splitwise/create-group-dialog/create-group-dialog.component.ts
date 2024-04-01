import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrl: './create-group-dialog.component.scss',
})
export class CreateGroupDialogComponent {
  groupName: string = '';
  groupMembers: string[] = [];

  @Output() groupCreated = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<CreateGroupDialogComponent>) {}

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
      groupName: this.groupName,
      groupMembers: this.groupMembers,
    };
    this.groupCreated.emit(group);
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
