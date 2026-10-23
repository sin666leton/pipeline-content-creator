import prisma from "../prisma";

const channelSeeder = async (userId: number, loop: number) => {
    for (let index = 0; index < loop; index++) {
        const channels = await prisma.channel.create({
            data: {
                userId: userId,
                platform: 'YouTube',
                handleName: `@CreatorStudioID${userId}`,
            },
        });
    }
}

export default channelSeeder