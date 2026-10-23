import { PrismaClient, FormatType, ContentStatus, ContentPriority } from '@prisma/client';
import bcrypt from 'bcrypt';
import channelSeeder from '../src/core/databases/seeder/channelSeeder';

const prisma = new PrismaClient();

async function main() {
  await prisma.contentMetric.deleteMany();
  await prisma.contentChecklist.deleteMany();
  await prisma.content.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.user.deleteMany();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('password123', saltRounds);

  const creatorUser = await prisma.user.upsert({
    where: { email: 'creator@example.com' },
    update: {},
    create: {
      name: 'Content Creator Dummy',
      email: 'creator@example.com',
      passwordHash: hashedPassword,
      role: 'creator',
    },
  });

  const creatorUser2 = await prisma.user.upsert({
    where: { email: 'creator2@example.com' },
    update: {},
    create: {
      name: 'Content Creator Dummy',
      email: 'creator2@example.com',
      passwordHash: hashedPassword,
      role: 'creator',
    },
  });

  await channelSeeder(Number(creatorUser.id), 100)

  await prisma.channel.create({
    data: {
      userId: creatorUser2.id,
      platform: 'YouTube',
      handleName: '@CreatorStudioID2',
    },
  });

  await prisma.channel.create({
    data: {
      userId: creatorUser.id,
      platform: 'YouTube',
      handleName: '@CreatorStudioID2',
    },
  });

  const youtubeChannel = await prisma.channel.create({
    data: {
      userId: creatorUser.id,
      platform: 'YouTube',
      handleName: '@CreatorStudioID',
    },
  });

  const instagramChannel = await prisma.channel.create({
    data: {
      userId: creatorUser.id,
      platform: 'Instagram',
      handleName: '@creator.daily',
    },
  });

await prisma.content.create({
    data: {
      userId: creatorUser.id,
      channelId: youtubeChannel.id,
      title: '5 Tips Ngoding Cepat dengan TypeScript & Prisma',
      description: 'Video vertikal singkat membahas tips produktivitas backend.',
      scriptDraft: 'Hook: "Masih ngetik query manual? Coba cara ini..."',
      formatType: FormatType.short_video,
      status: ContentStatus.published,
      priority: ContentPriority.high,
      scheduledDate: new Date('2026-10-10'),
      publishedDate: new Date('2026-10-10'),
      publishedUrl: 'https://youtube.com/shorts/dummy-short-url-1',
      checklists: {
        create: [
          { taskName: 'Riset tren hashtag coding', isCompleted: true },
          { taskName: 'Rekam video & screen recording', isCompleted: true },
          { taskName: 'Render & ekspor format 9:16', isCompleted: true },
        ],
      },
      metrics: {
        create: [
          {
            recordedAt: new Date('2026-10-11'),
            viewsCount: 15400,
            likesCount: 1250,
            commentsCount: 88,
            sharesCount: 320,
          },
        ],
      },
    },
  });

await prisma.content.create({
    data: {
      userId: creatorUser.id,
      channelId: instagramChannel.id,
      title: 'Panduan Lengkap Arsitektur Database Relasional',
      description: 'Micro-blog format carousel 7 slide mengenai normalisasi database.',
      scriptDraft: 'Slide 1: Kenapa database sering lemot?\nSlide 2: 1NF s.d 3NF...',
      formatType: FormatType.carousel,
      status: ContentStatus.ready,
      priority: ContentPriority.medium,
      scheduledDate: new Date('2026-10-16'),
      checklists: {
        create: [
          { taskName: 'Buat outline 7 slide', isCompleted: true },
          { taskName: 'Desain visual slide di Figma/Canva', isCompleted: true },
          { taskName: 'Tulis caption & CTA', isCompleted: false },
        ],
      },
    },
  });

await prisma.content.create({
    data: {
      userId: creatorUser.id,
      channelId: youtubeChannel.id,
      title: 'Membangun REST API Modern dari Nol dengan Express & Prisma 6',
      description: 'Tutorial mendalam studi kasus sistem manajemen konten.',
      scriptDraft: 'Intro: Setup project, routing, prisma schema, sampai JWT auth.',
      formatType: FormatType.long_video,
      status: ContentStatus.scripting,
      priority: ContentPriority.high,
      scheduledDate: new Date('2026-10-25'),
      checklists: {
        create: [
          { taskName: 'Rancang diagram arsitektur modul', isCompleted: true },
          { taskName: 'Tulis naskah lengkap sesi 1 - 3', isCompleted: false },
          { taskName: 'Siapkan repo starter template', isCompleted: false },
        ],
      },
    },
  });

  console.log('Success');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });