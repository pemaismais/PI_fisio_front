import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeycloakLoginComponent } from './keycloak-login.component';

describe('KeycloakLoginComponent', () => {
  let component: KeycloakLoginComponent;
  let fixture: ComponentFixture<KeycloakLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeycloakLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeycloakLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
