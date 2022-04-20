export class ValidationError extends Error {
  constructor( name = 'Validation failed') {
    super(name);
    this.name = 'ValidationError';
  }
}
