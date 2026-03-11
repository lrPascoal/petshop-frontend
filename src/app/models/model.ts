export interface Pet {
  id?: number;              // O '?' indica que é opcional (o banco/Java que vai gerar)
  nome: string;
  especie: 'Cachorro' | 'Gato' | 'Outro'; // Union type para evitar erros
  raca: string;
  peso: number;
  dataNascimento?: string;  // No início, string facilita a máscara de data
  tutorId: number;          // Chave estrangeira lógica para o dono
}


export interface Agendamento {
  id?: number;
  petId: number;
  petNome: string;     // Guardamos o nome para facilitar a exibição na tabela
  servicoId: number;
  servicoNome: string;
  dataHora: string;
  status: 'Aguardando' | 'Em andamento' | 'Concluído';
}

