import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpSignUpComponent } from './sp-sign-up.component';

describe('SpSignUpComponent', () => {
  let component: SpSignUpComponent;
  let fixture: ComponentFixture<SpSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
