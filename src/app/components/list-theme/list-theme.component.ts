import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Theme } from 'src/app/models/theme';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-list-theme',
  templateUrl: './list-theme.component.html',
  styleUrls: ['./list-theme.component.scss']
})
export class ListThemeComponent implements OnInit {

 
    themeDialog: boolean;
    deleteThemeDialog: boolean = false;
    deleteThemesDialog: boolean = false;
  
    theme: Theme = { id: '1', nom: '' };
    selectedThemes: Theme[];
    submitted: boolean;
    cols: any[];
    rowsPerPageOptions = [5, 10, 20];
  
    constructor(
      private typeService: ThemeService,
      private messageService: MessageService,
   
    ) {}
    themes?: Theme[];
    id_theme!:any;
  
    ngOnInit() {
      this.cols = [
        { field: 'nom', header: 'Nom' }
      ];
  
      this.loadTypes();
    }
  
    loadTypes() {
      this.typeService.getAll().subscribe(themes => {
        this.themes = themes;
      });
    }
  
    openNew() {
      this.theme = { id: '', nom: '' };
      this.submitted = false;
      this.themeDialog = true;
    }
  
    deleteSelectedTypes() {
      this.deleteThemesDialog = true;
    }
  
    editType(theme: Theme) {
      this.theme = { ...theme };
      this.themeDialog = true;
    }
  
    deleteType(theme: Theme) {
      this.deleteThemeDialog = true;
      this.theme = { ...theme };
    }
  
    confirmDeleteSelected() {
      this.deleteThemesDialog = false;
      this.typeService.delete(this.selectedThemes.map(type => type.id)).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Types Deleted',
          life: 3000
        });
        this.selectedThemes = null;
        this.loadTypes();
      });
    }
  
    confirmDelete() {
      this.deleteThemeDialog = false;
      this.typeService.delete(this.theme.id).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Type Deleted',
          life: 3000
        });
        this.loadTypes();
      });
      this.theme = { id: '', nom: '' };
    }
  
    hideDialog() {
      this.themeDialog = false;
      this.submitted = false;
    }
  saveType(): void {
    this.submitted = true;
  
    const data = {
      id: this.theme.id,
      nom: this.theme.nom
    };
  
    if (this.theme.id) {
      // Update existing type
      this.typeService.update(this.id_theme,data).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Type Updated',
            life: 3000
          });
          this.loadTypes();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Create new type
      this.typeService.createTheme(data).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Type Created',
            life: 3000
          });
          this.loadTypes();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  
    this.themeDialog = false;
  }
  
    
  
  
   
  
   
  }