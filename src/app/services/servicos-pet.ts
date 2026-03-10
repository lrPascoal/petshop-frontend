import { Injectable } from '@angular/core';

export interface Servico {
  id: number;
  nome: string;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicosPetService {
  // Chave que identifica nossos dados dentro do navegador
  private readonly STORAGE_KEY = 'petshop_servicos';

  private listaDeServicos: Servico[] = [];

  constructor() {
    // 1. Assim que o serviço nasce, ele tenta buscar o que está salvo
    this.carregarDoStorage();
  }

  // MÉTODO PRIVADO: Pega o texto do LocalStorage e transforma em Lista (Array)
  private carregarDoStorage(): void {
    const dadosSalvos = localStorage.getItem(this.STORAGE_KEY);
    
    if (dadosSalvos) {
      // JSON.parse transforma o texto de volta em objetos JavaScript
      this.listaDeServicos = JSON.parse(dadosSalvos);
    } else {
      // Se não tem nada salvo, começa com uma lista padrão
      this.listaDeServicos = [
        { id: 1, nome: 'Banho Simples', preco: 50.00 },
        { id: 2, nome: 'Tosa Higiênica', preco: 70.00 }
      ];
      this.salvarNoStorage(); // Já salva o padrão para a próxima vez
    }
  }

  // MÉTODO PRIVADO: Pega a Lista e transforma em texto para o LocalStorage
  private salvarNoStorage(): void {
    // JSON.stringify transforma a lista de objetos em uma única String (texto)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.listaDeServicos));
  }

  getServicos(): Servico[] {
    return this.listaDeServicos;
  }

  adicionar(novo: Servico): void {
    const ultimoId = this.listaDeServicos.length > 0 
      ? this.listaDeServicos[this.listaDeServicos.length - 1].id 
      : 0;
    novo.id = ultimoId + 1;
    
    this.listaDeServicos.push(novo);
    
    // TODA VEZ que mudar a lista, mandamos salvar
    this.salvarNoStorage();
  }

  remover(id: number): void {
    this.listaDeServicos = this.listaDeServicos.filter(s => s.id !== id);
    
    // TODA VEZ que mudar a lista, mandamos salvar
    this.salvarNoStorage();
  }
}