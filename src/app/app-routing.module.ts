import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './demo/component/auth/login/login.component';

const routes: Routes = [
    {
      path:'layout', component: LayoutComponent,
      children: [  
        { path: 'component', loadChildren: () => import('./demo/component/component.module').then(m => m.ComponentModule),data: { preload: true }, }
      ]
    },
    { path:'login', component: LoginComponent },
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
    },
  ];
  
  const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    preloadingStrategy:PreloadAllModules,
  };
  

@NgModule({
    imports: [
        // RouterModule.forRoot([
        //     {
        //         path: '', component: LayoutComponent,
        //         children: [  
        //             { path: 'uikit', loadChildren: () => import('./demo/component/uikit/uikit.module').then(m => m.UikitModule) }, 
        //         ]
        //     },
        // ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })

        RouterModule.forRoot(routes,routerConfig) 
        
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
