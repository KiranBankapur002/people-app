import { Component, OnInit, Inject } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  people: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(@Inject(PersonService) private personService: PersonService) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading = true;
    this.errorMessage = '';
    this.personService.getAllPeople().subscribe(
      (data: any[]) => {
        console.log('getAllPeople returned:', data);
        // if API returned empty array, use explicit fallback
        if (!data || (Array.isArray(data) && data.length === 0)) {
          this.errorMessage = 'No data from API — using fallback dataset.';
          this.personService.getFallbackPeople().subscribe(fb => {
            console.warn('Using fallback people dataset');
            this.people = fb;
            this.loading = false;
          });
        } else {
          this.people = data;
          this.loading = false;
        }
      },
      (error) => {
        console.error('Error loading people:', error);
        this.errorMessage = 'Failed to load people. Showing fallback data.';
        this.personService.getFallbackPeople().subscribe(fb => {
          this.people = fb;
          this.loading = false;
        });
      }
    );
  }

  deletePerson(id: number): void {
    if (confirm('Are you sure you want to delete this person?')) {
      this.personService.deletePerson(id).subscribe(
        () => {
          this.people = this.people.filter(p => p.id !== id);
          alert('Person deleted successfully!');
        },
        (error) => {
          console.error('Error deleting person:', error);
          alert('Failed to delete person.');
        }
      );
    }
  }
}
