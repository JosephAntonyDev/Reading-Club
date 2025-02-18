import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-club-modal',
  templateUrl: './join-club-modal.component.html',
  styleUrls: ['./join-club-modal.component.css']
})
export class JoinClubModalComponent {
  @Output() joinClub: EventEmitter<{ email: string; age: number }> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter(); // Evento para cerrar el modal
  joinForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.joinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.joinForm.valid) {
      this.joinClub.emit(this.joinForm.value);
    }
  }

  onClose() {
    this.close.emit(); // Emitir el evento de cierre
  }
}
