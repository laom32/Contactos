import { FormControl, ValidatorFn } from "@angular/forms";

export function WhiteSpaceValidator(control: FormControl) {
    if (isNullOrUndefined(control.value).trim().length === 0) {
        return {
            whiteSpacesError: { value: 'control tiene espacios sin caracteres' }
        };
    }
    return null;
}
export function locationValidator(control: FormControl) {
    if (typeof control.value !== 'object') {
        return {
            locationValidatorError: { value: 'No se eligió una opción del listado' }
        };
    }
    return null;
}
function isNullOrUndefined(valor: any, validarVacios: boolean = false) {
    let cond: boolean = (valor === null || valor === undefined || (validarVacios && (typeof valor === 'string' && valor.trim() === "")));

    return cond ? "" : valor;
}