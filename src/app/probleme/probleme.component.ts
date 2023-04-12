import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longeur-minimum/longeur-minimum.component';
import { TypeproblemService } from './typeproblem.service';
import { ITypeProbleme } from './typeprobleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  
  
  constructor(private fb: FormBuilder, private typeproblemeService: TypeproblemService){}

  ngOnInit(){
    this.problemeForm = this.fb.group({
      prenom: ['',[VerifierCaracteresValidator.longueurMinimum(3),Validators.required]],
      nom: ['',[Validators.maxLength(50),Validators.required]],
      typeproblem: ['']
       

    });
    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error); 
  }
  save(): void {
  }
}
