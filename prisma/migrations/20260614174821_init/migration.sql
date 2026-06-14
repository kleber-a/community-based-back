-- CreateEnum
CREATE TYPE "StatusDemanda" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'RESOLVIDO', 'CANCELADO');

-- CreateTable
CREATE TABLE "pessoas" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "data_nascimento" DATE,
    "endereco" TEXT,
    "telefone" VARCHAR(20),
    "ponto_referencia" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" VARCHAR(2),
    "cep" VARCHAR(8),
    "comunidade" TEXT,
    "local_votacao" TEXT,
    "titulo_eleitor" TEXT,
    "zona" VARCHAR(10),
    "secao" VARCHAR(10),
    "coordenador" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "obs" TEXT,
    "atividades" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demandas" (
    "id" TEXT NOT NULL,
    "nome_demanda" VARCHAR(150) NOT NULL,
    "descricao" TEXT,
    "status" "StatusDemanda" NOT NULL DEFAULT 'PENDENTE',
    "rua" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" VARCHAR(2),
    "icone" TEXT,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pessoa_id" TEXT,

    CONSTRAINT "demandas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_cpf_key" ON "pessoas"("cpf");

-- AddForeignKey
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
