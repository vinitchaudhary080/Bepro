import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@bepro.test';
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (admin) {
    if (admin.role !== 'admin') {
      await prisma.user.update({ where: { id: admin.id }, data: { role: 'admin' } });
      console.log('Promoted existing user to admin:', adminEmail);
    } else {
      console.log('Admin already exists:', adminEmail);
    }
  } else {
    // Optional: create a fresh admin (password: Admin@1234)
    const bcrypt = await import('bcryptjs');
    const passwordHash = await bcrypt.default.hash('Admin@1234', 12);
    await prisma.user.create({
      data: { name: 'BePro Admin', email: adminEmail, passwordHash, role: 'admin' },
    });
    console.log('Created admin user:', adminEmail);
  }
}

main().finally(() => prisma.$disconnect());
