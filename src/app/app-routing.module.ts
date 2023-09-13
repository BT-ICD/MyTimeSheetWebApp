import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout/layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: LayoutComponent,
                children: [  
                    { path: 'uikit', loadChildren: () => import('./demo/component/uikit/uikit.module').then(m => m.UikitModule) }, 
                ]
            },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
