import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { HomeComponent } from './pages/home/home';
import { authGuard } from './guards/auth-guard';
import { AuthLayoutComponent } from './layouts/auth.layout/auth-layout';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { LivroCadastroComponent } from './pages/livro-cadastro/livro-cadastro';
import { ClienteList } from './pages/cliente-list/cliente-list';
import { adminGuard } from './guards/admin-guard';
import { EmprestimoList } from './pages/emprestimo-list/emprestimo-list';

export const routes: Routes = [
    {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'livros/novo', component: LivroCadastroComponent},
      { path: 'livros/editar/:id', component: LivroCadastroComponent},
      { path: 'clientes/editar/:id', component: RegisterComponent},
      { path: 'clientes', component: ClienteList, canActivate: [adminGuard]},
      { path: 'emprestimos', component: EmprestimoList, canActivate: [adminGuard]},
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
