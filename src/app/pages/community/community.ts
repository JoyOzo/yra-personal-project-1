import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-community',
  imports: [PageHeader, RouterLink],
  templateUrl: './community.html',
  styleUrl: './community.css',
})
export class Community {}