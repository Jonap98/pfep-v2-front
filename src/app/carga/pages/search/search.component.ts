import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public partForm?: FormGroup = this.fb.group({
    num_part: ['']
  });

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('part_number');

  }

  @Output()
  public navegacion = new EventEmitter();

  onSubmit(): void {
    this.navegacion.emit( false );
    localStorage.setItem('part_number', this.partForm!.value.num_part);

    this.router.navigate(['./carga/parts-information']);

  }

}
