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
  id: number;
  petNome: string;     
  servicoNome: string; 
  data: string;        // Pode ser string ou Date
  hora: string;
  status: string;      // 'Aguardando', 'Em andamento', 'Concluído'
}