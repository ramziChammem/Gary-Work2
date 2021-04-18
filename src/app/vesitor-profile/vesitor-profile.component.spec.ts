import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesitorProfileComponent } from './vesitor-profile.component';

describe('VesitorProfileComponent', () => {
  let component: VesitorProfileComponent;
  let fixture: ComponentFixture<VesitorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VesitorProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VesitorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
