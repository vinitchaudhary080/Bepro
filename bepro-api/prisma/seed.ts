// prisma/seed.ts
import { PrismaClient, TaskFrequency } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@bepro.test';
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (admin) {
    if (admin.role !== 'admin') {
      await prisma.user.update({
        where: { id: admin.id },
        data: { role: 'admin' },
      });
      console.log('✅ Promoted existing user to admin:', adminEmail);
    } else {
      console.log('✅ Admin already exists:', adminEmail);
    }
  } else {
    const passwordHash = await bcrypt.hash('Admin@1234', 12);

    await prisma.user.create({
      data: {
        name: 'BePro Admin',
        email: adminEmail,
        passwordHash,
        role: 'admin',
      },
    });

    console.log('✅ Created admin user:', adminEmail);
  }
}

async function seedTaskTemplates() {
  console.log('\n🌱 Seeding TaskTemplate data...');

  const taskTemplates = [
    // ======================
    // DAILY TASKS (0.5 pts)
    // ======================
    {
      title: 'Score 15 Runs in a Match',
      description:
        'Prove your batting consistency by scoring at least 15 runs in any one match today.',
      frequency: TaskFrequency.DAILY,
      points: 0.5,
    },
    {
      title: 'Face 20 Legit Deliveries',
      description:
        'Show your temperament at the crease by facing a minimum of 20 legal balls in today’s match.',
      frequency: TaskFrequency.DAILY,
      points: 0.5,
    },
    {
      title: 'Bowl 2 Tight Overs',
      description:
        'Maintain control with the ball by bowling 2 overs with less than 8 runs conceded in total.',
      frequency: TaskFrequency.DAILY,
      points: 0.5,
    },
    {
      title: 'Take 1 Catch',
      description:
        'Stay sharp in the field and grab at least 1 clean catch in today’s play.',
      frequency: TaskFrequency.DAILY,
      points: 0.5,
    },
    {
      title: 'Hit 2 Boundaries',
      description:
        'Show your attacking intent by hitting at least 2 fours or sixes in a single match.',
      frequency: TaskFrequency.DAILY,
      points: 0.5,
    },

    // ======================
    // WEEKLY TASKS (2 pts)
    // ======================
    {
      title: 'Play 3 Matches This Week',
      description:
        'Stay active and committed by playing in at least 3 recorded matches this week.',
      frequency: TaskFrequency.WEEKLY,
      points: 2,
    },
    {
      title: 'Score 75+ Runs in the Week',
      description:
        'Accumulate a total of 75 or more runs across all matches this week.',
      frequency: TaskFrequency.WEEKLY,
      points: 2,
    },
    {
      title: 'Take 5 Wickets in the Week',
      description:
        'Dominate with the ball by taking a total of 5 or more wickets this week.',
      frequency: TaskFrequency.WEEKLY,
      points: 2,
    },
    {
      title: 'Maintain Economy Under 6',
      description:
        'Across this week’s matches, keep your overall bowling economy rate under 6 runs per over.',
      frequency: TaskFrequency.WEEKLY,
      points: 2,
    },

    // ======================
    // MONTHLY TASKS (10 pts)
    // ======================
    {
      title: 'Score 200+ Runs in a Month',
      description:
        'Show top-class batting form by scoring 200 or more runs in this month.',
      frequency: TaskFrequency.MONTHLY,
      points: 10,
    },
    {
      title: 'Take 15+ Wickets in a Month',
      description:
        'Lead the bowling charts by taking at least 15 wickets across all matches this month.',
      frequency: TaskFrequency.MONTHLY,
      points: 10,
    },
    {
      title: 'Play 10 Matches in a Month',
      description:
        'Stay consistent and committed by participating in at least 10 matches this month.',
      frequency: TaskFrequency.MONTHLY,
      points: 10,
    },
  ];

  for (const t of taskTemplates) {
    const existing = await prisma.taskTemplate.findFirst({
      where: {
        title: t.title,
        frequency: t.frequency,
      },
    });

    if (existing) {
      console.log(`↷ Skipping (already exists): [${t.frequency}] ${t.title}`);
      continue;
    }

    await prisma.taskTemplate.create({ data: t });
    console.log(`✅ Created: [${t.frequency}] ${t.title}`);
  }

  console.log('✅ TaskTemplate seeding completed.');
}

async function main() {
  console.log('🚀 Running BePro seed script...');
  await seedAdmin();
  await seedTaskTemplates();
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
