export class Task {
  id: number;
  title = '';
  description = '';
  date: number;
  complete = false;
  constructor (values: Object = {}) {
    Object.assign( this, values );
  }
}
