import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return this.height && this.weight && this.height > 0 && this.weight > 0;
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);

    let classification = "Não definida";

    switch (true) {
      case imc < 18.5:
        classification = "Magreza";
        break;

      case imc >= 18.5 && imc <= 24.9:
        classification = "Normal";
        break;

      case imc >= 25.0 && imc <= 29.9:
        classification = "Sobrepeso";
        break;

      case imc >= 30.0 && imc <= 39.9:
        classification = "Obesidade";
        break;

      case imc >= 40.0:
        classification = "Obesidade Grave";

      default:
        break;
    }

    this.showMessage(`IMC = ${imc.toFixed(2)}\nClassificação = ${classification}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();

    if (previousToast) await this.toastController.dismiss();

    const toast = await this.toastController.create({
      message: msg,
      color: "light",
      buttons: [
        {
          icon: "close",
        },
      ],
    });
    toast.present();
  }
}
