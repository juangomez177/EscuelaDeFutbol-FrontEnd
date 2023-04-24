import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaUComponent } from './galeria-u.component';

describe('GaleriaUComponent', () => {
  let component: GaleriaUComponent;
  let fixture: ComponentFixture<GaleriaUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
