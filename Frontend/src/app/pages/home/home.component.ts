import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { Router } from '@angular/router';
import { ContasService } from 'src/app/services/ContasService/contas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContaComponent } from '../modal-conta/modal-conta.component';
import { ModalAcaoComponent } from '../modal-acao/modal-acao.component';
import { nextTick } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario = '';
  contas = [{}];
  total = {};
  media = {};

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
    this.total = this.calculaContas();
    this.media = this.calculaMediaContas();
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
      this.total = this.calculaContas();
      this.media = this.calculaMediaContas();
    })
    .catch(err => {
      console.log(err);
    });
  }

  calculaContas() {
    let pagar = 0;
    let receber = 0;
    this.contas.forEach(conta => {
      if(!conta['quitada']) {
        if((conta['tipo'] == 'p'))
          pagar += conta['valor'];
        else
          receber += conta['valor'];
      }
    });

    return { pagar: pagar, receber: receber };
  }

  calculaMediaContas() {
    const qtdPagar = this.contas.reduce((a, b) => {
      return a + ((b.tipo == 'p') ? 1 : 0);
    }, 0);

    const qtdReceber = this.contas.reduce((a, b) => {
      return a + ((b.tipo == 'r') ? 1 : 0);
    }, 0);

    const somatorias = this.calculaContas();

    return { pagar: (somatorias.pagar/qtdPagar), receber: (somatorias.receber/qtdReceber) };
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

  async filtrarData(opcoesFiltro: any) {
    let consulta;
    switch(opcoesFiltro.tipo) {
      case 'l':
        consulta = await this.contasService.
          filtrarDataLancamento(opcoesFiltro.dataInicial, opcoesFiltro.dataFinal)
          .then(contas => {
            return contas;
          })
          .catch(err => {
            console.log(err);
          });
        break;
      case 'v':
        consulta = await this.contasService.
          filtrarDataVencimento(opcoesFiltro.dataInicial, opcoesFiltro.dataFinal)
          .then(contas => {
            return contas;
          })
          .catch(err => {
            console.log(err);
          });
        break;
      default:
        console.log("Opção inválida! 'l' para LANÇAMENTO e 'v' para VENCIMENTO!");
    }

    if(consulta) {
      this.contas = consulta.map(c => {
        const id = c.id;
        const tipo = c.tipo;
        const descricao = c.descricao;
        const valor = c.valor;
        const lancamento = c.lancamento;
        const vencimento = c.vencimento;
        const quitada = c.quitada;

        return { id, tipo, descricao, valor, lancamento, vencimento, quitada };
      });
    }

  }

}
