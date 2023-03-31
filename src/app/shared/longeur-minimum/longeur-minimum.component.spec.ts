import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longeur-minimum.component";

describe('Zones validator',() =>{
    it('#7 | Une chaîne avec 10 espaces est invalide', () => {
        let control = { value: ' '.repeat(10) }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });
      it('#8 | UNe phrase avec des mots est valide', () => {
        let control = { value: 'Vive angular' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });
      it('#9 | UNe phrase avec 3 espaces, des mots et ensuite 3 espaces est vaide', () => {
        let control = { value: ' Je le veux ' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });
      it('#10 | Une phrase avec 1 espace et 2 caractères est invalide', () => {
        let control = { value: ' xx' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });
      it('#11 | UNe phrase avec 2 espaces et 1 caractère est invalide', () => {
        let control = { value: '  x' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });
      it('#12 | UNe phrase avec 3 espaces et 1 caractères est invalide', () => {
        let control = { value: '   xxx' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });
      it('#13 | Une phrase avce 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let control = { value: '     xxxxx     ' }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });
      it('#14 | Une chaine nulle est invalide', () => {
        let control = { value: null }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });

});