import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayslineComponent } from './daysline.component';

describe('DayslineComponent', () => {
  let component: DayslineComponent;
  let fixture: ComponentFixture<DayslineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayslineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayslineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
