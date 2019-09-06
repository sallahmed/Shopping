import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationPipe} from './pagination/pagination.pipe';
import { ProfilePicturePipe } from './profilePicture/profilePicture.pipe';
import { ChatPersonSearchPipe } from './search/chat-person-search.pipe';
import { UserSearchPipe } from './search/user-search.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import { MailSearchPipe } from './search/mail-search.pipe';
//Import pour injection de service
import { Injector } from '@angular/core';
//import {AppInjector, setAppInjector} from '../../app-injector';

import {TranslateService} from '@ngx-translate/core';
//import {AppInjector} from '../../app-injector.service';

@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
        PaginationPipe,
        ProfilePicturePipe,
        ChatPersonSearchPipe,
        UserSearchPipe,
        TruncatePipe,
        MailSearchPipe
    ],
    exports: [
        PaginationPipe,
        ProfilePicturePipe,
        ChatPersonSearchPipe,
        UserSearchPipe,
        TruncatePipe,
        MailSearchPipe
    ]
})
export class PipesModule {
    /*constructor(injector: Injector ) {
        setAppInjector(injector);
        console.log(injector);
    }*/
}
