import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'exclude'
})
export class ExcludePipe implements PipeTransform {
    /*transform(input, select, selection) {
        let newInput = [];
        for(let i = 0; i < input.length; i++) {
            let addToArray = true;
            for (let j = 0; j < select.length; j++) {
                if (select[j].name === input[i].name) {
                    addToArray = false;
                }
            }
            if(addToArray || input[i].name === selection.name){
                newInput.push(input[i]);
            }
        }
        return newInput;
    }*/

    transform(input, select, selection) {
        let newInput = [];
        for(let i = 0; i < input.length; i++) {
            let addToArray = true;
            for (let j = 0; j < select.length; j++) {
                if (select[j] === input[i]) {
                    addToArray = false;
                }
            }
            if(addToArray || input[i] === selection) {
                newInput.push(input[i]);
            }
        }
        return newInput;
    }
}