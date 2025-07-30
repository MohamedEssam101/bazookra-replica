import { Component, inject } from '@angular/core';
import { loaderService } from '../../services/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  protected loader_Service = inject(loaderService);

  loader$ = this.loader_Service.isLoading$;
}
