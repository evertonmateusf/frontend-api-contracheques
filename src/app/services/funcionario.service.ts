import { FuncionarioDto } from './../models/funcionario.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiCollectionResponseDto } from '../models/response.dto';
import { API_CONFIG } from 'src/config/api.config';
import { ContrachequeDto } from '../models/contracheque.dto';

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {

  localUrl = API_CONFIG.baseUrl + '/funcionarios/';

  constructor(
    private httpClient: HttpClient,
  ) { }

  cadastraFuncionario(funcionario: FuncionarioDto): Observable<FuncionarioDto> {
    return this.httpClient.post<FuncionarioDto>(this.localUrl, JSON.stringify(funcionario));
  }

  alterarFuncionario(id: string | number, funcionario: FuncionarioDto): Observable<FuncionarioDto> {
    return this.httpClient.put<FuncionarioDto>(this.localUrl + id + '/', JSON.stringify(funcionario));
  }

  excluirFuncionario(id: string | number): Observable<any> {
    return this.httpClient.delete<any>(this.localUrl + id + '/');
  }

  getFuncionarios(): Observable<ApiCollectionResponseDto> {
    return this.httpClient.get<ApiCollectionResponseDto>(this.localUrl);
  }

  getCotracheque(id: string | number): Observable<ContrachequeDto> {
    return this.httpClient.get<ContrachequeDto>(this.localUrl + id + '/contracheque');
  }

}
