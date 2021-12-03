import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { GroceriesServiceProvider } from "../groceries-service.service"
import { InputDialogServiceProvider } from '../input-dialog-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  title = "Grocery";
  items: any = [];
  errorMessage: string;

  constructor(
    public toastCtrl: ToastController, public alertController: AlertController, public dataService: GroceriesServiceProvider,
    public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing, public navCtrl: NavController
  ) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
    this.loadItems();
  }
  ionViewDidLoad() {
    this.loadItems();
  }
  loadItems() {
    this.dataService.getItems().subscribe(
      (items) => (this.items = items),
      (error) => (this.errorMessage = <any>error)
    );
  }

  async removeItem(id) {
    this.dataService.removeItem(id);
  }

  async editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.showEditItemPrompt({ item, index });
    }  
  
  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
    }
  
  async showAddItemPrompt() {
    const prompt = await this.alertController.create({
      message: "Please enter item...",
      inputs: [
          {
            name: 'name',
            placeholder: 'Name'
          },
          {
            name: 'quantity',
            placeholder: 'Quantity'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: item => {
              console.log('Saved clicked', item);
              this.items.push(item);
            }
          }
        ]
      });
      prompt.present();
    }
  
  async showEditItemPrompt({ item, index }: { item; index; }) {
    const prompt = await this.alertController.create({
        message: "Please edit item...",
        inputs: [
          {
            name: 'name',
            placeholder: 'Name',
            value: item.name
          },
          {
            name: 'quantity',
            placeholder: 'Quantity',
            value: item.quantity
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: item => {
              console.log('Saved clicked', item);
              this.items[index] = item;
            }
          }
        ]
      });
      prompt.present();
    } 
}