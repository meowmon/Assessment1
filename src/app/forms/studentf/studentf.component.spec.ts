import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentfComponent } from './studentf.component';

describe('StudentfComponent', () => {
  let component: StudentfComponent;
  let fixture: ComponentFixture<StudentfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
