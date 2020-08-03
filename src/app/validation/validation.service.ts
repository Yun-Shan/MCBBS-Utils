import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private results: any = null;
  private threads: any = null;
  private threadMap: { [tid: number]: any } = {};

  constructor(private http: HttpClient) {
  }

  getResults(): Promise<any> {
    if (this.results !== null) {
      return new Promise<any>(resolve => resolve(this.results));
    }
    return new Promise<any>((resolve, reject) => {
      this.http.get(`/api/data/results.json?r=${Math.random()}`)
        .subscribe(res => {
          this.results = res;
          resolve(res);
        }, err => reject(err));
    });
  }

  getThreads(): Promise<any> {
    if (this.threads !== null) {
      return new Promise<any>(resolve => resolve(this.threads));
    }
    return new Promise<any>((resolve, reject) => {
      this.http.get(`/api/data/threads.json?r=${Math.random()}`)
        .subscribe(res => {
          this.threads = res;
          resolve(res);
        }, err => reject(err));
    });
  }

  getThread(tid: number): Promise<any> {
    if (!Number.isInteger(tid)) {
      return new Promise<any>((_, reject) => reject(tid));
    }
    if (this.threadMap[tid] !== undefined) {
      return new Promise<any>((resolve, reject) => {
        if (this.threadMap[tid]) {
          resolve(this.threadMap[tid]);
        } else {
          reject(this.threadMap[tid]);
        }
      });
    }
    return new Promise<any>((resolve, reject) => {
      this.http.get(`/api/data/thread/${tid}.json?r=${Math.random()}`)
        .subscribe(res => {
          this.threadMap[tid] = res;
          resolve(res);
        }, err => {
          this.threadMap[tid] = null;
          reject(err);
        });
    });
  }
}
