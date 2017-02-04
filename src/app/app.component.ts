import { Component, OnInit } from '@angular/core';
import { MenuService } from './home/menu.service';
import { AuthService } from './_services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	menu : any;

	constructor(private menuService: MenuService, private authService: AuthService) { }

	ngOnInit() {
		this.menu = this.menuService.getMenu();
	}
}
