import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      
      return [];
    }
    if (value=='None') {
     
        return items;
      }
    if (!field || !value) {
     
      return items;
    }
   
    return items.filter(singleItem =>
       
        singleItem.Status.toLowerCase().indexOf(value.toLowerCase())!==-1);
        
  }
}