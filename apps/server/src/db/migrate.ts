import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './index';

export async function runMigrations() {
	try {
		console.log('🔄 Running migrations...');
		await migrate(db, { migrationsFolder: './' });
		console.log('✅ Migrations complete.');
	} catch (error) {
		console.error('❌ Migration failed:', error);
		process.exit(1); // Stop app if migration fails
	} finally {
		await pool.end();
	}
}
