import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervioesComponent } from './supervioes.component';

describe('SupervioesComponent', () => {
  let component: SupervioesComponent;
  let fixture: ComponentFixture<SupervioesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervioesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
