import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPlayComponent } from './dashboard-play.component';

describe('DashboardPlayComponent', () => {
  let component: DashboardPlayComponent;
  let fixture: ComponentFixture<DashboardPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
