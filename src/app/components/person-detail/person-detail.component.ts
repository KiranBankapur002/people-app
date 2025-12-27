import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  person: any = null;
  loading = true;
  errorMessage = '';
  personId: number | null = null;

  constructor(
    @Inject(PersonService) private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.personId = +params['id'];
      this.loadPerson();
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

  deletePerson(): void {
    if (this.personId && confirm('Are you sure you want to delete this person?')) {
      this.personService.deletePerson(this.personId).subscribe(
        () => {
          alert('Person deleted successfully!');
          this.router.navigate(['/people']);
        },
        (error) => {
          console.error('Error deleting person:', error);
          alert('Failed to delete person.');
        }
      );
    }
  }
}
