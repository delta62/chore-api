export function Endpoint(): Function {
  return(fn: Function, method: string): void => {
    console.log('Endpoint decorator', fn, method);
  };
}
