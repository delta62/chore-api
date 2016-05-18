import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MongoClient,
  Db as MongoDb,
  Collection
} from 'mongodb';

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

  find(): (collection: Collection) => Observable<Array<any>> {
    return (collection: Collection): Observable<Array<any>> => {
      let cb: Function = collection.find().toArray.bind(collection);
      return Observable.bindNodeCallback<Array<any>>(cb)();
    };
  }
}
