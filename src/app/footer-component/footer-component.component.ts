import { Component } from '@angular/core';
import { faChevronUp, faRss } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrl: './footer-component.component.css'
})
export class FooterComponentComponent {

  // Asignar los iconos a propiedades
  faChevronUp = faChevronUp;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faRss = faRss;
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
