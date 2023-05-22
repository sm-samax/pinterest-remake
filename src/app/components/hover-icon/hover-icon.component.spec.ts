import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverIconComponent } from './hover-icon.component';

describe('HoverIconComponent', () => {
  let component: HoverIconComponent;
  let fixture: ComponentFixture<HoverIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoverIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoverIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
