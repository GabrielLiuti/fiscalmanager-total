import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
const prisma = new PrismaClient();

async function main() {
  const senhaHash = await argon2.hash('123456');
  await prisma.usuario.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: { email: 'admin@demo.com', senhaHash, role: 'admin' }
  });
  const empresa = await prisma.empresa.create({
    data: { nome: 'Demo Indústria SP', cnpj: '00.000.000/0001-00' }
  });
  await prisma.produto.create({
    data: { empresaId: empresa.id, nome: 'Cabo de Rede Cat6', ncm: '8544.42.00', cfop: '5102' }
  });
  console.log('Seed concluído');
}
main().catch((e) => (console.error(e), process.exit(1))).finally(async () => prisma.$disconnect());
