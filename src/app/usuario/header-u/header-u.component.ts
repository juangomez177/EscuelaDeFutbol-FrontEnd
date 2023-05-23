import { Component } from '@angular/core';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-header-u',
  templateUrl: './header-u.component.html',
  styleUrls: ['./header-u.component.css']
})
export class HeaderUComponent {
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;

}
