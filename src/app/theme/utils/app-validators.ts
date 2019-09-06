import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

export function emailValidator(control: FormControl): {[key: string]: any} {
    // var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/; // Juste les miniscules
    const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Les majuscules
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}

//export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string)/*:{[key: string]: any}*/ {
export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string):{[key: string]: any} {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
            //return {mismatchedPasswords: true};
        }
    }
}


export function phoneNumberValidator(control: FormControl): {[key: string]: any} {
    var phoneNumberRegexp = /[0-9\+\-\ ]/;
    if (control.value && !phoneNumberRegexp.test(control.value)) {
        return {invalidPhoneNumber: true};
    }
}

export function excelFileValidator(control: FormControl): {[key: string]: any} {
    var excelFileRegexp = /^.*\.(xls|xlsx|csv)$/;
    if (control.value && !excelFileRegexp.test(control.value)) {
        return {invalidExcelFileExtention: true};
    }
}