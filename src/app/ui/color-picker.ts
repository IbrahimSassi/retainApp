import { Component ,
    Input, Output,
EventEmitter} from '@angular/core';

@Component({
    selector:'color-picker',
    template : `
    <div class="color-selector">
        <i 
        (click)="showSelector(true)"
        class="material-icons icon">color_lens</i>
        <div class="selector row center-xs"
         *ngIf="isSelectorVisible">
            <div 
            *ngFor="let color of colors"
            [ngStyle]= "{'background-color':color}"
            (click)="selectColor(color)"
            class="color">
            </div>
        </div>
    </div>

    `,
    styles: [`
        .color-selector {
      position: relative;
    }
    .selector {
      min-width: 120px;
      border: 1px solid lightgrey;
      padding: 10px;
      background-color: #efefef;
      position: absolute;
      top: -100px;
      left: 0;
    }
    .color {
      height: 30px;
      width: 30px;
      border-radius: 100%;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .color:hover {
      border: 2px solid darkgrey;
    }
    .icon {
      font-size: 1.4rem;
      color: grey;
      cursor: pointer;
    }

    `]


})

export class ColorPicker {


    @Input() colors:Array<string> = [];
    @Output() selected = new EventEmitter();

    isSelectorVisible: boolean = false;

    showSelector(value:boolean){
        this.isSelectorVisible = value;
    }

    selectColor(color){
        this.showSelector(false);
        this.selected.emit(color);
    }
}