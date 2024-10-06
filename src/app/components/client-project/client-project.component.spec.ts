import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientProjectComponent } from './client-project.component';


describe('ClientProjectComponent', () => {
  let component: ClientProjectComponent;
  let fixture: ComponentFixture<ClientProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientProjectComponent] // Use declarations instead of imports
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
