import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { Router } from '@angular/router';
import { ContasService } from 'src/app/services/ContasService/contas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContaComponent } from '../modal-conta/modal-conta.component';
import { ModalAcaoComponent } from '../modal-acao/modal-acao.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario = '';
  contas = [{}];

  constructor(
    private loginService: LoginService,
    private contasService: ContasService,
    private modalService: NgbModal,
    private router: Router
  ) {
    if(!this.loginService.getUsuarioLogado()) {
      this.router.navigate(['']);
      console.log('Por favor, efetue autenticação antes!');
    }
    else {
      this.usuario = this.loginService.getUsuarioLogado();
    }

    this.getContas();
  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['']);
  }

  getContas() {
    this.contasService.getContas()
    .then(contas => {
      this.contas = contas.map(c => {
        const id = c.id;
        const tipo = c.tipo;
        const descricao = c.descricao;
        const valor = c.valor;
        const lancamento = c.lancamento;
        const vencimento = c.vencimento;
        const quitada = c.quitada;

        return { id, tipo, descricao, valor, lancamento, vencimento, quitada };
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  modalConta(id: number) {
    const modal = this.modalService.open(ModalContaComponent);
    if(id != undefined)
      modal.componentInstance.id = id;
  }

  modalAcao(operacao: string, id: number) {
    const modal = this.modalService.open(ModalAcaoComponent);
    modal.componentInstance.operacao = operacao;
    modal.componentInstance.id = id;
  }

  recarregar() {
    this.getContas();
  }

}
