import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CommonModule } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule.forRoot(),
    FormsModule,
    CommonModule
  ],
  providers: [
    provideHttpClient(),
    provideHttpClientTesting(),
    {
      provide: SQLite,
      useValue: {
        create: () => Promise.resolve({
          executeSql: () => Promise.resolve({ 
            rows: { 
              length: 0, 
              item: () => ({}),
              items: () => []
            }
          })
        })
      }
    }
  ],
  exports: [IonicModule, FormsModule, CommonModule]
})
export class TestingModule { }
