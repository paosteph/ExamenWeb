import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaNoEncontradoComponent } from './ruta-no-encontrado.component';

describe('RutaNoEncontradoComponent', () => {
  let component: RutaNoEncontradoComponent;
  let fixture: ComponentFixture<RutaNoEncontradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaNoEncontradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaNoEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
