import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcolhimentoComponent } from './acolhimento.component';

describe('AcolhimentoComponent', () => {
  let component: AcolhimentoComponent;
  let fixture: ComponentFixture<AcolhimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcolhimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcolhimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
