#!/usr/bin/env node

export class ObjectProperties {
    // Extract value from specific path
    static getObjectProperty = (object: any, path: string) => {
      if (object == null) {
        // null or undefined
        return object;
      }
      const parts = path.split('.');
      for (let i = 0; i < parts.length; ++i) {
        if (object == null) {
          // null or undefined
          return undefined;
        }
        const key = parts[i];
        object = object[key];
      }
      return object;
    };
  
    // To use in convert CSV to JSON
  
    // Use to asign load value in specific path in object
    static setObjectProperty = (object: any, path: string, value: any) => {
      const parts = path.split('.');
      const limit = parts.length - 1;
      for (let i = 0; i < limit; ++i) {
        const key = parts[i];
        object = object[key] ?? (object[key] = {});
      }
      const key = parts[limit];
      object[key] = value;
    };
  }