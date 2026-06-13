// src/modules/demanda/entities/demanda.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { People } from '../../people/entities/people.entity';

export enum StatusDemanda {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  RESOLVIDO = 'RESOLVED',
  CANCELADO = 'CANCELADO',
}

@Entity('demandas')
export class Demands {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'nome_demanda', length: 150 })
  nomeDemanda!: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ type: 'enum', enum: StatusDemanda, default: StatusDemanda.PENDENTE })
  status!: StatusDemanda;

  // Endereço da Demanda
  @Column({ type: 'varchar', nullable: true })
  rua?: string;

  @Column({ type: 'varchar', nullable: true })
  bairro?: string;

  @Column({ type: 'varchar', nullable: true })
  cidade?: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  uf?: string;

  @Column({ type: 'varchar', nullable: true })
  icone?: string; // Pode guardar o nome ou caminho de um ícone/imagem

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao!: Date;

  // Relacionamento: Muitas demandas podem pertencer a uma Pessoa (opcional)
  @ManyToOne(() => People, (people) => people.demandas, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa?: People;
}