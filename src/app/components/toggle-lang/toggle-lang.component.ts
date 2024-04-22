import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toggle-lang',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toggle-lang.component.html',
  styleUrl: './toggle-lang.component.scss'
})
export class ToggleLangComponent {

lang = input('he');
  
toggleLanguage() {

}

}
