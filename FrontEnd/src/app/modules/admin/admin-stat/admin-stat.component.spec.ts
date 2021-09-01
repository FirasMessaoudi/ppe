import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatComponent } from './admin-stat.component';

describe('AdminStatComponent', () => {
  let component: AdminStatComponent;
  let fixture: ComponentFixture<AdminStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
