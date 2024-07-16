import prisma from './DB/index.js';

const chainId = '421614';
const batchSize = 10;

async function createBatchTable(batchNumber) {
    const tableName = `batch_${batchNumber}`;
    await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            id SERIAL PRIMARY KEY,
            fractionalAddress VARCHAR(255),
            tokenId INT,
            chainId VARCHAR(255),
            walletAddress VARCHAR(255)
        );
    `);
    return tableName;
}

async function getLatestBatchNumber() {
    const result = await prisma.$queryRaw`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_name LIKE 'batch_%'
        ORDER BY table_name DESC
        LIMIT 1;
    `;
    if (result.length === 0) {
        return 1;
    }
    const latestTableName = result[0].table_name;
    const latestBatchNumber = parseInt(latestTableName.split('_')[1], 10);
    return latestBatchNumber;
}

async function mintNFT(data) {
    const { fractionalAddress, walletAddress } = data;

    let latestBatchNumber = await getLatestBatchNumber();
    let tableName = `batch_${latestBatchNumber}`;

    const countResult = await prisma.$queryRawUnsafe(`
        SELECT COUNT(*) FROM ${tableName};
    `);

    if (parseInt(countResult[0].count, 10) >= batchSize) {
        latestBatchNumber += 1;
        tableName = await createBatchTable(latestBatchNumber);
    }

    const tokenId = parseInt(countResult[0].count, 10) + 1;

    await prisma.$executeRawUnsafe(`
        INSERT INTO ${tableName} (fractionalAddress, tokenId, chainId, walletAddress)
        VALUES ($1, $2, $3, $4);
    `, fractionalAddress, tokenId, chainId, walletAddress);

    console.log(`Minted NFT: Token ID ${tokenId}, Batch Table ${tableName}`);
}


const mintingData = {
    fractionalAddress: "0xc5429705b931d171d35A16E24fCb8Cf10481A516",
    walletAddress: "0xA879eB55AaD088A8a19E06610129d4CDb4f2c99b",
};

(async () => {
    try {
        // Create the initial batch table 
        const initialBatchNumber = await getLatestBatchNumber();
        if (initialBatchNumber === 1) {
            await createBatchTable(1);
        }

        await mintNFT(mintingData);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
})();
