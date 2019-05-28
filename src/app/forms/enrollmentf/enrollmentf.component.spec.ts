import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentfComponent } from './enrollmentf.component';

describe('EnrollmentfComponent', () => {
  let component: EnrollmentfComponent;
  let fixture: ComponentFixture<EnrollmentfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
