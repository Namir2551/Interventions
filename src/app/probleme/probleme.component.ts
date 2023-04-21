import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longeur-minimum/longeur-minimum.component';
import { TypeproblemService } from './typeprobleme.service';
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
      typeProbleme: ['', Validators.required],
      notification:["NePasMeNotifier"],
       
      courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          courrielConfirmation: [{value: '', disabled: true}],
        }),
      telephone: [{value: '', disabled: true}],
      descriptionProbleme: ['',[Validators.required,Validators.minLength(5)]],
      noUnite:'',
      dateProbleme:{value:Date(),disabled:true}

    });
    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);
               this.problemeForm.get('notification').valueChanges.subscribe(value => this.appliquerNotif(value)); 
  }
  
  save(): void {
  }

  appliquerNotif(TypeNotif:string): void {
    const notifCourriel = this.problemeForm.get('courrielGroup.courriel');
    const confirmationCourriel = this.problemeForm.get('courrielGroup.courrielConfirmation');   // confi 
    const notifTelephone = this.problemeForm.get('telephone');      

    // Tous remettre à zéro
    notifCourriel.clearValidators();
    notifCourriel.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    notifCourriel.disable();  

    confirmationCourriel.clearValidators();
    confirmationCourriel.reset();    
    confirmationCourriel.disable();
    
    notifTelephone.clearValidators();
    notifTelephone.reset();    
    notifTelephone.disable();

    // courriel 
    if (TypeNotif === 'ParCourriel') {  
            
            notifCourriel.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
            notifCourriel.enable();  
            confirmationCourriel.setValidators([Validators.required]);              
            confirmationCourriel.enable();  
            // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
            // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
           // datesGroupControl.setValidators([Validators.compose([datesValides])]);                       
      }   
      else
      {
        if(TypeNotif === 'ParMessagetexte')
        {
          notifTelephone.setValidators([Validators.required, Validators.minLength(10),  Validators.maxLength(10), Validators.pattern('[0-9]+')]);    
          notifTelephone.enable();  
             
        }
      }
    

    confirmationCourriel.updateValueAndValidity();   
    notifCourriel.updateValueAndValidity();   
    notifTelephone.updateValueAndValidity();      
  }

  



}
