import { Component, OnInit, Input } from '@angular/core';
import { ContasService } from 'src/app/services/ContasService/contas.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-acao',
  templateUrl: './modal-acao.component.html',
  styleUrls: ['./modal-acao.component.css']
})
export class ModalAcaoComponent implements OnInit {

  @Input() operacao: string;
  @Input() id: number;

  constructor(
    private contasService: ContasService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  concluir() {
    if(this.operacao) {
      switch(this.operacao) {
        case 'q':

          this.contasService.getConta(this.id)
          .then(conta => {
            if(conta) {
              let c = conta;
              c.quitada = true;
              this.contasService.quitarConta(c)
              .then(con => {
                alert('Conta quitada com sucesso');
                this.activeModal.close();
              })
              .catch(err => {
                alert('Erro ao quitar conta');
                console.log(err);
              });
            }

          })
          .catch(err => {
            alert('Erro ao quitar conta');
            console.log(err);
          });

          break;
        case 'e':

          if(this.id) {
            this.contasService.deleteConta(this.id)
            .then(() => {
              alert('Conta excluída com sucesso');
              this.activeModal.close();
            })
            .catch(err => {
              alert('Erro ao excluir conta');
              console.log(err);
            });
          }

          break;
        default:
          console.log("Informe uma opção válida! 'q' para QUITAR e 'e' para EXCLUIR!");
      }
    }
  }
}
