import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfessionsComponent } from './admin-professions.component';

describe('AdminProfessionsComponent', () => {
  let component: AdminProfessionsComponent;
  let fixture: ComponentFixture<AdminProfessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
