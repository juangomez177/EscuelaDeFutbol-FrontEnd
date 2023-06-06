import { Component } from '@angular/core';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer-a',
  templateUrl: './footer-a.component.html',
  styleUrls: ['./footer-a.component.css'],
})
export class FooterAComponent {
  phoneIcon = faPhone;
  envelopeIcon = faEnvelope;
  mapMarkerIcon = faMapMarkerAlt;

  constructor() {}
}
