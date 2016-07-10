declare module 'slug' {

  interface SlugOptions {
    replacement?: string;
    symbols?: boolean;
    remove?: RegExp;
    lower?: boolean;
    charmap?: any;
    multicharmap?: any;
  }

  function slug(str: string): string;
  function slug(str: string, replacement: string): string;
  function slug(str: string, opts: SlugOptions): string;

  export = slug;

}
