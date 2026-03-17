export interface Pet {
  id?: number;
  nome: string;
  especie: string;
  raca: string;
  peso: number;
}

export interface Servico {
  id?: number;
  nome: string;
  preco: number;
}

export interface Agendamento {
  id?: number;
  petId: number;
  servicoId: number;
  dataHora: string;
  status: string;
  petNome?: string;     // <-- ADICIONE ISSO
  servicoNome?: string;  // <-- ADICIONE ISSO
}