import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAttendanceComponent } from './single-attendance.component';

describe('SingleAttendanceComponent', () => {
  let component: SingleAttendanceComponent;
  let fixture: ComponentFixture<SingleAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
