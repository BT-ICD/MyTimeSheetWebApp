import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomtoastComponent } from './customtoast.component';

describe('CustomtoastComponent', () => {
  let component: CustomtoastComponent;
  let fixture: ComponentFixture<CustomtoastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomtoastComponent]
    });
    fixture = TestBed.createComponent(CustomtoastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
