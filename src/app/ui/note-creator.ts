import { Component,Output,EventEmitter} from '@angular/core';
import { ColorPicker } from './color-picker';
@Component({
    selector: 'note-creator',
    directives :[ColorPicker],
    template: `
    <div class="note-creator shadow-2" 
    [ngStyle]="{'background-color':newNote.color}"
    >
    <!-- <pre> {{ newNote | json}}</pre> -->
      <form class="row"
      (submit)="onCreateNote()"
      >
        <input
          type="text"
          [(ngModel)]="newNote.title"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          *ngIf="fullForm"
        >
        <input
          type="text"
          (focus)="toogle(true)"
          [(ngModel)]="newNote.value"

          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
        >
        <div 
        class="actions col-xs-12 row between-xs"
        *ngIf="fullForm"
        >
            <div class="col-xs-3">
                <color-picker [colors]="colors"
                (selected)="onColorSelect($event)" 
                ></color-picker>
            </div>
            <button
            type="submit"
            class="btn-light"
           >
            Done
            </button>
        </div>
      </form>
    </div>

    `,
    styles : [`
    .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
	

    `]
})

export class NoteCreator {

    @Output() createNote= new EventEmitter();
    newNote = {
        title:"",
        value: "",
        color: "#ecf0f1"
    };
    fullForm:boolean= false;
    colors: Array<string> = ["#1abc9c","#f1c40f","#e74c3c","#2980b9","#8e44ad","#7f8c8d"];


    onColorSelect(color:string){
        this.newNote.color = color;
    }


onCreateNote(){
    console.log("Submitted");
    const {title, value,color}= this.newNote;

    if(title && value){
        this.createNote.emit({title,value,color});
        this.reset();
    }
};

reset(){
    this.newNote = {
        title:"",
        value: "",
        color: "#ecf0f1"
    };


}

toogle(value:boolean){
    this.fullForm = value;

}

}