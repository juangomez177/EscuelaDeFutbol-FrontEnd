import { Component } from '@angular/core';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header-a',
  templateUrl: './header-a.component.html',
  styleUrls: ['./header-a.component.css']
})
export class HeaderAComponent {

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;

}
