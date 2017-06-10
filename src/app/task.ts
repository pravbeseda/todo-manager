export class Task {
  id: number;
  title = '';
  desciption = '';
  date: number;
  complete = false;
  constructor (values: Object = {}) {
    Object.assign( this, values );
  }
}
