export class FuncionarioDto {
  id: string | number;
  nome: string;
  sobrenome: string;
  documento: string;
  setor: string;
  salarioBruto: number;
  dataDeAdmissao: Date;
  descontaPlanoDeSaude: boolean | string;
  descontaPlanoDental: boolean | string;
  descontaValeTransporte: boolean | string;
}
