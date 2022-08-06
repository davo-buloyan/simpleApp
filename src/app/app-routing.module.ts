import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'table' },
  {
    path: 'table',
    title: 'App | Table',
    loadComponent: () => import('./table').then((m) => m.TableComponent),
  },
  {
    path: 'charts',
    title: 'App | Charts',
    loadComponent: () => import('./charts').then((m) => m.ChartsComponent),
  },
  {
    path: 'cards',
    title: 'App | Cards',
    loadComponent: () => import('./cards').then((m) => m.CardsComponent),
  },
  {
    path: '404',
    title: 'Todos App | Not Found',
    loadComponent: () => import('./page-not-found').then((m) => m.PageNotFoundComponent),
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
