import { Component, OnInit, Input } from '@angular/core';
import { ContasService } from 'src/app/services/ContasService/contas.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-conta',
  templateUrl: './modal-conta.component.html',
  styleUrls: ['./modal-conta.component.css']
})
export class ModalContaComponent implements OnInit {

  @Input() id: number;
  conta = {
    id: undefined,
    tipo: '',
    descricao: '',
    valor: undefined,
    lancamento: '',
    vencimento: '',
    quitada: false
  };

  constructor(
    private contasService: ContasService,
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    console.log(this.id);
    if(this.id) {
      this.contasService.getConta(this.id)
      .then(conta => {
        if(conta) {
          this.conta = conta;
          this.conta.lancamento = this.formataData(this.conta.lancamento);
          this.conta.vencimento = this.formataData(this.conta.vencimento);
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  registrar() {
    this.contasService.setConta(this.conta)
    .then(() => {
      alert('Conta registrada com sucesso');
      this.activeModal.close();
    })
    .catch(err => {
      alert('Erro ao registrar conta');
      console.log(err);
    });
  }

  alterar() {
    console.log(this.conta);
    this.contasService.updateConta(this.conta)
    .then(() => {
      alert('Conta alterada com sucesso');
      this.activeModal.close();
    })
    .catch(err => {
      alert('Erro ao alterar conta');
      console.log(err);
    });
  }

  public formataData(data: any): string {
    let dataFormatada = data.slice(0, 10);
    dataFormatada = dataFormatada.split('-');
    dataFormatada = dataFormatada[2] + '/' + dataFormatada[1] + '/' + dataFormatada[0];
    return dataFormatada;
  }

}
