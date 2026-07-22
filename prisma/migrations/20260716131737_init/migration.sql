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
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demandas" (
    "id" TEXT NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "descricao" TEXT,
    "status" "StatusDemanda" NOT NULL DEFAULT 'PENDENTE',
    "rua" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" VARCHAR(2),
    "fotos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demandas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoas_demandas" (
    "pessoaId" TEXT NOT NULL,
    "demandaId" TEXT NOT NULL,
    "solicitadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pessoas_demandas_pkey" PRIMARY KEY ("pessoaId","demandaId")
);

-- CreateTable
CREATE TABLE "_CategoriaToPeople" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_cpf_key" ON "pessoas"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaToPeople_AB_unique" ON "_CategoriaToPeople"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaToPeople_B_index" ON "_CategoriaToPeople"("B");

-- AddForeignKey
ALTER TABLE "pessoas_demandas" ADD CONSTRAINT "pessoas_demandas_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoas_demandas" ADD CONSTRAINT "pessoas_demandas_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "demandas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToPeople" ADD CONSTRAINT "_CategoriaToPeople_A_fkey" FOREIGN KEY ("A") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToPeople" ADD CONSTRAINT "_CategoriaToPeople_B_fkey" FOREIGN KEY ("B") REFERENCES "pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
