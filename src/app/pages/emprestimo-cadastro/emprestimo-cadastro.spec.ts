import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoCadastro } from './emprestimo-cadastro';

describe('EmprestimoCadastro', () => {
  let component: EmprestimoCadastro;
  let fixture: ComponentFixture<EmprestimoCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoCadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmprestimoCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
