import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subcategory} from '../_models/subcategory';
import {City} from '../_models/city';
import {Service} from '../_models/service';


@Injectable()
export class ApiService {

    constructor(private http: Http) {
    }

    topSubcategories(): Observable<Subcategory[]> {
        return this.http.get('http://localhost/login/api/topsubcategories').map((response: Response) => {
            if (response)
                return response.json().data;
            else {
                return new Subcategory[0];
            }
        });
    }

    cities(): Observable<City[]> {
        return this.http.get('http://localhost/login/api/cities').map((response: Response) => {
            if (response)
                return response.json().data;
            else {
                return new Subcategory[0];
            }
        });
    }

    categories(): Observable<any> {
        return this.http.get('http://localhost/login/api/categories').map((response: Response) => {
            if (response)
                return response.json().data;
            else {
                return new Array();
            }
        });
    }

    allSubCategories(): Observable<any> {
        return this.http.get('http://localhost/login/api/allsubcateogries').map((response: Response) => {
            if (response)
                return response.json().data;
            else {
                return new Array();
            }
        });
    }

    subCategories(id: number): Observable<Subcategory[]> {
        return this.http.get('http://localhost/login/api/subcategories/' + id).map((response: Response) => {
            if (response)
                return response.json().data;
            else {
                return new Array();
            }
        });
    }

    servicesSub(id: number): Observable<any> {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);
            return this.http.get('http://localhost/login/api/servicessub/' + id, {headers: headers}).map((response: Response) => {
                if (response)
                    return response.json().data;
                else {
                    return new Array();
                }
            });
        } else {
            return this.http.get('http://localhost/login/api/servicessub/' + id).map((response: Response) => {
                if (response)
                    return response.json().data;
                else {
                    return new Array();
                }
            });
        }
    }

    myfavorites(): Observable<any> {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);
            return this.http.get('http://localhost/login/api/myfavorites', {headers: headers}).map((response: Response) => {
                if (response)
                    return response.json().data;
                else {
                    return new Array();
                }
            });
        }
    }

    myServices(): Observable<any> {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);
            return this.http.get('http://localhost/login/api/myservices', {headers: headers}).map((response: Response) => {
                if (response)
                    return response.json().data;
                else {
                    return new Array();
                }
            });
        }
    }

    service(id: string): Observable<any> {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);

            return this.http.get('http://localhost/login/api/service/' + id, {headers: headers}).map((response: Response) => {
                if (response) {
                    return response.json();
                } else {
                    return new Array();
                }
            });
        }
        else {
            return this.http.get('http://localhost/login/api/service/' + id).map((response: Response) => {
                if (response)
                    return response.json();
                else {
                    return new Array();
                }
            });
        }
    }

    markfavorite(id: number): Observable<Subcategory[]> {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);
            return this.http.get('http://localhost/login/api/markfavorite/' + id, {headers: headers}).map((response: Response) => {
                if (response)
                    return response.json().data;
                else {
                    return new Array();
                }
            });
        }
    }

    disMarkfavorite(id: number): Observable<Subcategory[]> {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);
            return this.http.get('http://localhost/login/api/dismarkfavorite/' + id, {headers: headers}).map((response: Response) => {
                if (response)
                    return response.json().data;
                else {
                    return new Array();
                }
            });
        }
    }

    rateService(id: number, rate: number): Observable<any> {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);
            return this.http.get('http://localhost/login/api/rateservice/' + id + '/' + rate, {headers: headers}).map((response: Response) => {
                if (response)
                    return response.json().data;
                else {
                    return new Array();
                }
            });
        }
    }

    report(report: string): Observable<any> {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);
            return this.http.post('http://localhost/login/api/report', report, {headers: headers}).map((response: Response) => {
                    if (response.json().result === true) {
                        return true;
                    } else {
                        return {error: response.json().result};
                    }
                }
            );
        }
    }

    createService(service: Service): Observable<any> {
        // const body = JSON.stringify(service);
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);
            console.log(service);
            return this.http.post('http://localhost/login/api/createservicestep1', service, {headers: headers}).map(response => response.json()).map(result => {
                if (!result.error) {
                    return result;
                }
                return result;
            });
        } else {
            return new Observable();
        }
    }

    searchService(query: any): Observable<any> {
        return this.http.get('http://localhost/login/api/searchservice/' + query).map(response => {
            if (response)
                return response.json().data;
            else {
                return new Array();
            }
        });
    }

    createGalery(service: Service): Observable<any> {
        // const body = JSON.stringify(service);
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);
            console.log(service);
            return this.http.post('http://localhost/login/api/createservicestep2', service, {headers: headers}).map(response => response.json()).map(result => {
                if (!result.error) {
                    return result;
                }
                return result;
            });
        } else {
            return new Observable();
        }
    }

    createFullService(service: Service): Observable<any> {
        // const body = JSON.stringify(service);
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const headers = new Headers();
            headers.append('Authorization', JSON.parse(currentUser).token);
            console.log(service);
            return this.http.post('http://localhost/login/api/createservicefull', service, {headers: headers}).map(response => response.json()).map(result => {
                if (!result.error) {
                    return result;
                }
                return result;
            });
        } else {
            return new Observable();
        }
    }


}
