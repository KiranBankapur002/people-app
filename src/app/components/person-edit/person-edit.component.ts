import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  person: Person = {
    firstName: '',
    lastName: '',
    email: ''
  };
  isEditMode = false;
  loading = false;
  errorMessage = '';
  personId: number | null = null;

  constructor(
    @Inject(PersonService) private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.personId = +params['id'];
        this.isEditMode = true;
        this.loadPerson();
      }
    });
  }

  loadPerson(): void {
    if (this.personId) {
      this.loading = true;
      this.personService.getPersonById(this.personId).subscribe(
        (data: any) => {
          this.person = {
            id: data.id,
            firstName: data.name ? data.name.split(' ')[0] : (data.firstName || ''),
            lastName: data.name ? data.name.split(' ')[1] : (data.lastName || ''),
            email: data.email,
            phone: data.phone,
            address: data.address && data.address.street ? data.address.street : (data.address || '')
          };
          this.loading = false;
        },
        (error) => {
          console.error('Error loading person:', error);
          this.errorMessage = 'Failed to load person details.';
          this.loading = false;
        }
      );
    }
  }

  savePerson(): void {
    if (!this.person.firstName || !this.person.lastName || !this.person.email) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.isEditMode && this.personId) {
      this.personService.updatePerson(this.personId, this.person).subscribe(
        () => {
          alert('Person updated successfully!');
          this.router.navigate(['/people']);
        },
        (error) => {
          console.error('Error updating person:', error);
          alert('Failed to update person.');
        }
      );
    } else {
      this.personService.createPerson(this.person).subscribe(
        () => {
          alert('Person added successfully!');
          this.router.navigate(['/people']);
        },
        (error) => {
          console.error('Error creating person:', error);
          alert('Failed to add person.');
        }
      );
    }
  }
}
