import { Component ,Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input() name:string="null";
@Input() value:number=0;
@Input() units:string=""



// Function to round decimals and format the value
roundDecimals(value: number): string {
  const roundedValue = parseFloat(value.toFixed());
  const options = { minimumFractionDigits: value.toString().includes('.') ? 2 : 0 };

  return roundedValue.toLocaleString("es-ES", options);
}



}
