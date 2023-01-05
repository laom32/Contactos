import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './modules/contact/contact.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  {
    path: '',
    data: {
      layout: 'empty'
    },
    children: [
      { path: 'index', loadChildren: () => import('app/modules/contact/contact.module').then(m => m.ContactModule) },
    ]
  },
  { path: '**', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
