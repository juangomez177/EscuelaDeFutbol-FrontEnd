import { Component } from '@angular/core';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer-u',
  templateUrl: './footer-u.component.html',
  styleUrls: ['./footer-u.component.css'],
})
export class FooterUComponent {
  phoneIcon = faPhone;
  envelopeIcon = faEnvelope;
  mapMarkerIcon = faMapMarkerAlt;

  constructor() {}
}
