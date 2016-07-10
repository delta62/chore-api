declare module 'validate' {
  interface SchemaValidator {
    validate(obj: any): Array<Error>;
  }

  function schema(def: Object): SchemaValidator;

  export = schema;
}
