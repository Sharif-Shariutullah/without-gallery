import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FINANCANDACCOUNTINGComponent } from './financ-and-accounting.component';

describe('FINANCANDACCOUNTINGComponent', () => {
  let component: FINANCANDACCOUNTINGComponent;
  let fixture: ComponentFixture<FINANCANDACCOUNTINGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FINANCANDACCOUNTINGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FINANCANDACCOUNTINGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
