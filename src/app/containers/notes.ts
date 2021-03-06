import { Component,OnDestroy } from '@angular/core';
import { NoteCard,NoteCreator} from '../ui';
import { NoteService } from '../services';
import { Store } from '../store';
import 'rxjs/Rx'

@Component({
    selector:'notes-container',
    directives: [
        NoteCard,
        NoteCreator
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
        <note-creator
        (createNote)="onCreateNote($event)"
        >
        </note-creator>
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

export class Notes  {
  /*  note = {
        title : "New Note",
        value : "Note Here Blablablaba",
        color : '#2980b9'
    } */

    notes = [];


    constructor(
        private noteService:NoteService,
        private store:Store){
            
            this.store.changes.pluck('notes')
            .subscribe((notes:any)=>this.notes= notes)
            
            this.noteService.getNotes()
            //.subscribe(res => this.notes = res.data)
            .subscribe();
    }


    onNoteChecked(note,i){
        this.noteService.completeNote(note)
                /*.subscribe(note => {
                const i = this.notes.findIndex(localnote => localnote.id === note.id);  
                this.notes.splice(i,1);
                })*/
                .subscribe();

    }

    onCreateNote(note){
        console.log(note);
        this.noteService.createNote(note)
            //.subscribe(note => this.notes.push(note));
            .subscribe();
    }

    ngOnDestroy(){
        console.log('destroyed');
    }


};