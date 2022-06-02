import { ComponentFixture, TestBed } from '@angular/core/testing';

import { addAttendannceComponent } from './addAttendance';

describe('addAttendanceComponent', () => {
  let component: addAttendannceComponent;
  let fixture: ComponentFixture<addAttendannceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ addAttendannceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(addAttendannceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
