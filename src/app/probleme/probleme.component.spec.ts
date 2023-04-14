import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { repeat } from 'rxjs';

import { ProblemeComponent } from './probleme.component';
import { VerifierCaracteresValidator } from '../shared/longeur-minimum/longeur-minimum.component';
import { TypeproblemService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //  it('should create', () => {
  //    expect(component).toBeTruthy();
  //  });

  // Prenom
  it('Zone Prenom invalide avec 2 caracteres',()=>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone Prenom valide avec 3 caracteres',()=>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone Prenom valide avec 200 caracteres',()=>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone Prenom invalide avec aucune valeur',()=>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone Prenom Invalide avec 10 espaces',()=>{
    let control = { value: '          ' }
    let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
    
  });

  it('Zone Prenom Invalide avec 2 espaces et 1 caracteres',()=>{
    let control = { value: '  x' }
    let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
    
  });
      
  it("Zone TELEPHONE est désactivée quand ne pas me notifier", () => {
    component.appliquerNotif("NePasMeNotifier");
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it("Zone TELEPHONE est vide quand ne pas me notifier", () => {
    component.appliquerNotif("NePasMeNotifier");
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  it("Zone COURRIEL est désactivée quand ne pas me notifier", () => {
    component.appliquerNotif("NePasMeNotifier");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it("Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () => {
    component.appliquerNotif("NePasMeNotifier");
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });
  





  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotif('ParCourriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notif par courriel', () => {
    component.appliquerNotif('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID')
  });

  
  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotif('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('INVALID'); 
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotif('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID'); 
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotif('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('INVALID'); 
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotif('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID'); 
  });
  


  it('#25 | Zone COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotif("ParCourriel")
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = {};
    courrielConfirmation.setValue('gui@hotmail.com');
    courriel.setValue('');
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });
  it('#26 | Zone COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotif("ParCourriel")
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = {};
    courriel.setValue('gui@hotmail.com');
    courrielConfirmation.setValue('');
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });
  it('#27 | Zone COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
      component.appliquerNotif("ParCourriel")
      let courriel = component.problemeForm.get('courrielGroup.courriel');
      let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let groupe = component.problemeForm.get('courrielGroup');
      let errors = {};
      courriel.setValue('gui@hotmail.com');
      courrielConfirmation.setValue('guill@hotmail.com');
      errors = groupe.errors || {};
      expect(errors['match']).toBeUndefined();
  });
  it('#28 | Zone COURRIEL et Zone CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
      component.appliquerNotif("ParCourriel")
      let courriel = component.problemeForm.get('courrielGroup.courriel');
      let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let groupe = component.problemeForm.get('courrielGroup');
      let errors = {};
      courriel.setValue('gui@hotmail.com');
      courrielConfirmation.setValue('');
      errors = groupe.errors || {};
      expect(errors['match']).toBeUndefined();
  });





});

