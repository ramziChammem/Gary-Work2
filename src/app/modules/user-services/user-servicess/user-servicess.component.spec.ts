import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserServicessComponent } from './user-servicess.component';

describe('UserServicessComponent', () => {
  let component: UserServicessComponent;
  let fixture: ComponentFixture<UserServicessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserServicessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserServicessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
