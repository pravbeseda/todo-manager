export class Task {
  id: number;
  title = '';
  description = '';
  date: string;
  complete = false;
  constructor (values: Object = {}) {
    Object.assign( this, values );
  }
}
