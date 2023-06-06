import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaleriaAComponent } from './galeria-a.component';

describe('GaleriaAComponent', () => {
  let component: GaleriaAComponent;
  let fixture: ComponentFixture<GaleriaAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
