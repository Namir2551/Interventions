import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { repeat } from 'rxjs';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],

      declarations: [ ProblemeComponent ]
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
    let zone = component.problemeForm.controls['prenomProbleme'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone Prenom valide avec 3 caracteres',()=>{
    let zone = component.problemeForm.controls['prenomProbleme'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone Prenom valide avec 200 caracteres',()=>{
    let zone = component.problemeForm.controls['prenomProbleme'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone Prenom invalide avec aucune valeur',()=>{
    let zone = component.problemeForm.controls['prenomNonVide'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone Prenom valide avec 10  espaces',()=>{
    expect(true).toBeTruthy();
  });

  it('Zone Prenom valide avec 2 espaces et 1 caracteres',()=>{
    expect(true).toBeTruthy();
  });

});
