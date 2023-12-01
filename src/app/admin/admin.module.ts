import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { NgxsModule } from '@ngxs/store';
import { MemberState} from './state/admin.state';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminBoardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    
    NgxsModule.forFeature([MemberState])
  ],
  exports:[
    AdminBoardComponent
  ],
})
export class AdminModule { }
