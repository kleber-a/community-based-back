// src/modules/pessoa/entities/pessoa.entity.ts
import { Demands } from 'src/modules/demands/entities/demands.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
// import { Demands } from '../../demanda/entities/demanda.entity';

@Entity('pessoas')
export class People {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  nome!: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  cpf!: string;

  @Column({ type: 'date', name: 'data_nascimento', nullable: true })
  dataNascimento!: Date;

  // Endereço
  @Column({ type: 'varchar', nullable: true })
  endereco!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone!: string;

  @Column({ type: 'varchar', name: 'ponto_referencia', nullable: true })
  pontoReferencia!: string;

  @Column({ type: 'varchar', nullable: true })
  bairro!: string;

  @Column({ type: 'varchar', nullable: true })
  cidade!: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  uf!: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  cep!: string;

  @Column({ type: 'varchar', nullable: true })
  comunidade!: string;

  // Dados Eleitorais
  @Column({ type: 'varchar', name: 'local_votacao', nullable: true })
  localVotacao!: string;

  @Column({ type: 'varchar', name: 'titulo_eleitor', nullable: true })
  tituloEleitor!: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  zona!: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  secao!: string;

  @Column({ type: 'varchar', nullable: true })
  coordenador!: string;

  // Redes Sociais e Extras
  @Column({ type: 'varchar', nullable: true })
  facebook!: string;

  @Column({ type: 'varchar', nullable: true })
  instagram!: string;

  @Column({ type: 'text', nullable: true })
  obs!: string;

  @Column({ type: 'text', nullable: true })
  atividades!: string;

  // Relacionamento: Uma pessoa pode ter muitas demandas
  @OneToMany(() => Demands, (demands) => demands.pessoa)
  demandas?: Demands[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;
}