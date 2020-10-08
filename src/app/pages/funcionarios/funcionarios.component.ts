import { ContrachequeDto } from './../../models/contracheque.dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { FuncionarioDto } from 'src/app/models/funcionario.dto';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  funcionario: FuncionarioDto;
  contracheque: ContrachequeDto;
  funcionarios: Array<FuncionarioDto>;
  columns: Array<PoTableColumn>;
  columnsLancamento: Array<PoTableColumn>;

  constructor(
    private funcionarioService: FuncionarioService,
    private authService: AuthService,
    private router: Router) {
    this.funcionarios = [];
  }

  ngOnInit(): void {
    this.funcionarioService.getFuncionarios()
      .subscribe(listaDeFuncionariosDaAPI => {
        listaDeFuncionariosDaAPI.content.map(funcionario => {
          funcionario.descontaPlanoDeSaude = funcionario.descontaPlanoDeSaude ? 1 : 0;
          funcionario.descontaPlanoDental = funcionario.descontaPlanoDental ? 1 : 0;
          funcionario.descontaValeTransporte = funcionario.descontaValeTransporte ? 1 : 0;
          this.funcionarios.push(funcionario);
        });
      },
        error => {
          if (error.status === 403) {
            this.authService.logout();
            this.router.navigate(['login']);
          }
        }
      );
    this.columns = this.getColumns();
    this.columnsLancamento = this.getColumnsLancamentos();
  }


  isUndelivered(row, index: number): boolean {
    return row.status !== 'delivered';
  }


  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id',  label: 'Código', width: '80px' },
      { property: 'nome', width: '200px' },
      { property: 'sobrenome', width: '150px' },
      { property: 'documento', width: '150px' },
      { property: 'setor', width: '100px' },
      { property: 'salarioBruto', label: 'Salário Bruto', width: '150px', type: 'currency' },
      { property: 'dataDeAdmissao', label: 'Data Admissão', width: '150px', type: 'date' },
      {
        property: 'descontaPlanoDeSaude',
        label: 'Plano de saúde',
        tooltip: 'Plano de saúde',
        type: 'label',
        width: '150px',
        labels: [
          { value: 1, color: 'color-11', label: 'Sim' },
          { value: 0, color: 'color-08', label: 'Não' }
        ]
      },
      {
        property: 'descontaPlanoDental',
        label: 'Plano dental',
        tooltip: 'Plano dental',
        type: 'label',
        width: '150px',
        labels: [
          { value: 1, color: 'color-11', label: 'Sim' },
          { value: 0, color: 'color-08', label: 'Não' }
        ]
      },
      {
        property: 'descontaValeTransporte',
        label: 'Vale Transporte',
        tooltip: 'Vale Transporte',
        type: 'label',
        width: '150px',
        labels: [
          { value: 1, color: 'color-11', label: 'Sim' },
          { value: 0, color: 'color-08', label: 'Não' }
        ]
      },
    ];
  }
  getColumnsLancamentos(): Array<PoTableColumn> {
    return [
      { property: 'tipoLancamento', label: 'Tipo' },
      { property: 'descricao'},
      { property: 'valor', type: 'currency'}
    ];
  }

  onExpandDetail(rowItem): void {
    this.funcionario = rowItem;
    this.contracheque = null;
    this.funcionarioService.getCotracheque(rowItem.id)
      .subscribe(response => {
        this.contracheque = response;
      },
        error => {
          if (error.status === 403) {
            this.authService.logout();
            this.router.navigate(['login']);
          }
          console.log('error:' + error);
        }
      );
  }
}

