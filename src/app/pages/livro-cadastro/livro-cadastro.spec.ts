import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroCadastro } from './livro-cadastro';

describe('LivroCadastro', () => {
  let component: LivroCadastro;
  let fixture: ComponentFixture<LivroCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroCadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivroCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
