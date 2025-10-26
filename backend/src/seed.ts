import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de dados...');

  const empresa = await prisma.empresa.create({
    data: {
      nome: 'Empresa Exemplo LTDA',
      cnpj: '12345678000100',
      endereco: 'Rua Principal, 1000'
    }
  });

  const produto1 = await prisma.produto.create({
    data: { nome: 'Produto A', preco: 10.5, empresaId: empresa.id }
  });

  const produto2 = await prisma.produto.create({
    data: { nome: 'Produto B', preco: 20.0, empresaId: empresa.id }
  });

  await prisma.notaFiscal.create({
    data: {
      numero: '0001',
      empresaId: empresa.id,
      itens: {
        create: [
          { produtoId: produto1.id, quantidade: 2, valor: 21.0 },
          { produtoId: produto2.id, quantidade: 1, valor: 20.0 }
        ]
      }
    }
  });

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
