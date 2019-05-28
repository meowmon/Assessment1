import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursefComponent } from './coursef.component';

describe('CoursefComponent', () => {
  let component: CoursefComponent;
  let fixture: ComponentFixture<CoursefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
