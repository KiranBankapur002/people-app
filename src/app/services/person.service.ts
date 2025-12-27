import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  private readonly fallbackPeople: Person[] = [
    { id: 1, firstName: 'Leanne', lastName: 'Graham', email: 'Sincere@april.biz', phone: '1-770-736-8031', address: 'Kulas Light' },
    { id: 2, firstName: 'Ervin', lastName: 'Howell', email: 'Shanna@melissa.tv', phone: '010-692-6593', address: 'Victor Plains' },
    { id: 3, firstName: 'Clementine', lastName: 'Bauch', email: 'Nathan@yesenia.net', phone: '1-463-123-4447', address: 'Douglas Extension' }
  ];

  /**
   * Public accessor for fallback people (useful for components/tests)
   */
  getFallbackPeople() {
    return of(this.fallbackPeople);
  }

  /**
   * Get all people/users from the API
   */
  getAllPeople(): Observable<Person[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => (users || []).map(u => ({
        id: u.id,
        firstName: u.name ? String(u.name).split(' ')[0] : (u.firstName || ''),
        lastName: u.name ? String(u.name).split(' ')[1] : (u.lastName || ''),
        email: u.email,
        phone: u.phone,
        address: u.address && u.address.street ? u.address.street : (u.address || '')
      }) as Person)),
      catchError(() => of(this.fallbackPeople))
    );
  }

  /**
   * Get a specific person by ID
   */
  getPersonById(id: number): Observable<Person> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(u => ({
        id: u.id,
        firstName: u.name ? String(u.name).split(' ')[0] : (u.firstName || ''),
        lastName: u.name ? String(u.name).split(' ')[1] : (u.lastName || ''),
        email: u.email,
        phone: u.phone,
        address: u.address && u.address.street ? u.address.street : (u.address || '')
      }) as Person),
      catchError(() => of(this.fallbackPeople.find(p => p.id === id) as Person))
    );
  }

  /**
   * Create a new person
   */
  createPerson(person: Person): Observable<any> {
    return this.http.post<any>(this.apiUrl, person);
  }

  /**
   * Update an existing person
   */
  updatePerson(id: number, person: Person): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, person);
  }

  /**
   * Delete a person
   */
  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
