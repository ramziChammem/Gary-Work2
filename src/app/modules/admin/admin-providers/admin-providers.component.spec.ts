import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProvidersComponent } from './admin-providers.component';

describe('AdminProvidersComponent', () => {
  let component: AdminProvidersComponent;
  let fixture: ComponentFixture<AdminProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
