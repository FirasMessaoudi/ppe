import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducytbynetworkComponent } from './producytbynetwork.component';

describe('ProducytbynetworkComponent', () => {
  let component: ProducytbynetworkComponent;
  let fixture: ComponentFixture<ProducytbynetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducytbynetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducytbynetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
