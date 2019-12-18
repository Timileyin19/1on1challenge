import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChallengeComponent } from './dashboard-challenge.component';

describe('DashboardChallengeComponent', () => {
  let component: DashboardChallengeComponent;
  let fixture: ComponentFixture<DashboardChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
