export class UsuarioDto {
    codigo: string | number;
    nome: string;
    email: string;
    dataHoraUltimoBloqueio: string;
    dataHoraUltimaAlteracao: string;
    usuarioInclusao: UsuarioDto;
    usuarioUltimaAlteracao: UsuarioDto;
    status: string;
}
