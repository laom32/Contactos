import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetAlertMsgService {

    constructor() { }
    alertAlerta(title: string, text: string) {
        return Swal.fire({
            title: title,
            text: text,
            width: 400,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'popup-class',
            },
        });
    }

    alertAlertOk(title: string, text: string, footer: string = '') {
        return Swal.fire({
            icon: 'warning',
            title: title,
            text: text,
            footer: footer,
            customClass: {
                popup: 'popup-class',
            },
        })
    }

    alertConfirmDelete(title: string, text: string, TituloMsjConfirmacion: string = 'Atención', textoMsjConfirmacion: string = 'se ha eliminado correctamente') {
        return Swal.fire({
            title: title,
            text: text,
            width: 400,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            customClass: {
                popup: 'popup-class',
            },
        })
    }

    alertError(title: string, text: string, footer: string = '') {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: footer,
            customClass: {
                popup: 'popup-class',
            },
        })
    }

    alertConfirm(title: string, text: string, TituloMsjConfirmacion: string = '', textoMsjConfirmacion: string = '') {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'popup-class',
            },
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    TituloMsjConfirmacion,
                    textoMsjConfirmacion,
                    'success'
                )
            }
        })
    }

    alertWarningConfirm(title: string, text: string, TituloMsjConfirmacion: string = 'Atención', textoMsjConfirmacion: string = 'se ha eliminado correctamente') {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            customClass: {
                popup: 'popup-class',
            },
        }).then((result) => {
            return result;
        })
    }

    alertWarning(title: string, text: string, footer: string = '') {
        return Swal.fire({
            icon: 'warning',
            title: title,
            // text: text,
            html: text,
            footer: footer,
            customClass: {
                popup: 'popup-class',
            },
        })
    }

    alertSuccess(title: string, text: string) {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            // type: 'success',
            customClass: {
                popup: 'popup-class',
            },
        });
    }

    alertInfo(title: string, text: string) {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'info',
            //  type: 'info',
            customClass: {
                popup: 'popup-class',
            },
        });
    }

    alertConfirmConGuardadoUnidades(title: string, text: string): Observable<any> {
        let resultV: any = { resp: false };
        return resultV;
    }

    alertaConPregunta(title: string) {
        return Swal.fire({
            title: title,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            showLoaderOnConfirm: true,
            customClass: {
                popup: 'popup-class',
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    }

    alertConfirmGuardar(title: string, text: string, TituloMsjConfirmacion: string = '', textoMsjConfirmacion: string = '') {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'popup-class',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire(
                //   TituloMsjConfirmacion,
                //   textoMsjConfirmacion,
                //   'success'
                // )
            }
            return result;
        })
    }

    alertWarningRequired(title: string, text: string) {
        return Swal.fire({
            title: title,
            text: text,
            //   type: 'warning',
            icon: 'warning',
            customClass: {
                popup: 'popup-class',
            },
        });
    }
}
