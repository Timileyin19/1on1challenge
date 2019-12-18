import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMyGamesComponent } from './dashboard-my-games.component';

describe('DashboardMyGamesComponent', () => {
  let component: DashboardMyGamesComponent;
  let fixture: ComponentFixture<DashboardMyGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMyGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMyGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
