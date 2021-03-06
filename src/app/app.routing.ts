import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CrearDocenteComponent } from './crear-docente/crear-docente.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { ActualizarDocenteComponent } from './actualizar-docente/actualizar-docente.component';
import { VerDocenteComponent } from './ver-docente/ver-docente.component';
import { DocentesComponent } from './docentes/docentes.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ActualizarAlumnoComponent } from './actualizar-alumno/actualizar-alumno.component';
import { BuscarComponent } from './buscar/buscar.component';
import { VerAlumnoComponent } from './ver-alumno/ver-alumno.component';
import { NuevaAltaAlumnoComponent } from './nueva-alta-alumno/nueva-alta-alumno.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioAdmiComponent } from './editar-usuario-admi/editar-usuario-admi.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { PerfilHistoricoAlumnoComponent } from './perfil-historico-alumno/perfil-historico-alumno.component';
import { InitComponent } from './init/init.component';
import { GuardGuard } from './guards/guard.guard';
import { RoleGuard } from './guards/role.guard';
import { OtherGuard } from './guards/other.guard';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '', component: InitComponent, canActivateChild: [GuardGuard, OtherGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'buscar', component: BuscarComponent },
      { path: 'editar-perfil/:username', component: EditarUsuarioComponent },
      { path: 'alumnos', component: AlumnosComponent },
      { path: 'docentes', component: DocentesComponent },
      { path: 'crear-docente', component: CrearDocenteComponent },
      { path: 'ver-docente/:codigo', component: VerDocenteComponent },
      { path: 'actualizar-docente/:codigo', component: ActualizarDocenteComponent },
      { path: 'crear-alumno', component: CrearAlumnoComponent },
      { path: 'ver-alumno/:codigo', component: VerAlumnoComponent },
      { path: 'actualizar-alumno/:codigo', component: ActualizarAlumnoComponent },
      { path: 'nueva-alta-alumno/:codigo', component: NuevaAltaAlumnoComponent },
      { path: 'perfil-historico-alumno/:codigo', component: PerfilHistoricoAlumnoComponent }
    ]
  },
  {
    path: '', component: InitComponent, canActivateChild: [GuardGuard, RoleGuard], children: [
      { path: 'admin', component: AdminComponent },
      { path: 'ver-usuarios', component: VerUsuariosComponent },
      { path: 'crear-usuario', component: CrearUsuarioComponent },
      { path: 'editar-usuario-admi/:username', component: EditarUsuarioAdmiComponent },
    ]
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);