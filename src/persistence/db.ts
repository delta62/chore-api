import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MongoClient,
  Db as MongoDb,
  Collection,
  Cursor
} from 'mongodb';

type DbFindFn<T> = (collection: Collection) => Observable<T>;

@Injectable()
export class Db {
  connect(uri: string): Observable<MongoDb> {
    let client = new MongoClient();
    let cb: Function = client.connect.bind(client);
    return Observable.bindNodeCallback<MongoDb>(cb)(uri);
  }

  getCollection(collectionName: string): (db: MongoDb) => Observable<Collection> {
    return (db: MongoDb): Observable<Collection> => {
      let cb: Function = db.collection.bind(db);
      return Observable.bindNodeCallback<Collection>(cb)(collectionName);
    };
  }

  find<T>(criteria?: Object, projection?: Object): (collection: Collection) => Observable<Array<any>> {
    return (collection: Collection): Observable<Array<any>> => {
      let cursor: Cursor = collection.find(criteria, projection);
      let cb: Function = cursor.toArray.bind(cursor);
      return Observable.bindNodeCallback<Array<any>>(cb)();
    };
  }

  insert(doc: any): (collection: Collection) => Observable<void> {
    return (collection: Collection): Observable<void> => {
      let cb: Function = collection.insertOne.bind(collection);
      return Observable.bindNodeCallback<void>(cb)(doc);
    };
  }
}
