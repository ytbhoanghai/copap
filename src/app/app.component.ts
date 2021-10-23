import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'copap';

  ngOnInit(): void {
    console.log("Environment: " + (environment.production ? "Production" : "Development"))
  }
}
