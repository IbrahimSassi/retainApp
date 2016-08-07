import { Component } from '@angular/core';
import { NoteCard } from '../ui';

@Component({
    selector:'notes-container',
    directives: [
        NoteCard
        ],
    styles : [`
            .notes {
        padding-top: 50px;
        }
        .creator {
        margin-bottom: 40px; 
        }

    `],
    template : `
    <div class="row center-xs notes">
      <div class="col-xs-6 creator">
        note creator here
      </div>
      <div class="notes col-xs-8">
        <div class="row between-xs">
            <note-card 
            class="col-xs-4"
            [note]="note"
            *ngFor="let note of notes; let i = index"
            (checked)="onNoteChecked($event,i)"
             >
            </note-card>   
        </div>
      </div>
    </div>
    `
})

export class Notes {
  /*  note = {
        title : "New Note",
        value : "Note Here Blablablaba",
        color : '#2980b9'
    } */

    notes = [
    {
        title : "First Note",
        value : "Note Here Blablablaba",
        color : '#2980b9'
    },
    {
        title : "Second Note",
        value : "Note Here Blablablaba",
        color : '#e74c3c'
    },
    {
        title : "Third Note",
        value : "Note Here Blablablaba",
        color : '#16a085'
    },

    ];

    onNoteChecked(note,i){
        this.notes.splice(i,1);
        console.log(note);
    }


};