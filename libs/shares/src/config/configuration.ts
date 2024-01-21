import * as dotenv from 'dotenv'
import { isBoolean } from 'class-validator'
import * as process from 'process'
dotenv.config()

interface Configuration {
    common: {
        nodeEnv: string
        networkEnv: string
    }
    database: {
        host: string
        port: number
        name: string
        user: string
        pass: string
        type: string
        logging: boolean
        synchronize: boolean
    }
    api: {
        port: number
        prefix: string
        accessJwtSecretKey: string
        refreshJwtSecretKey: string
        accessTokenExpireInSec: number
        refreshTokenExpireInSec: number
        secretSystemAdminPasswordKey: string
        systemAdminAccessJwtSecretKey: string
        systemAdminRefreshJwtSecretKey: string
        systemAdminAccessTokenExpireInSec: number
        systemAdminRefreshTokenExpireInSec: number
    }
    email: {
        host: string
        // port: number;
        secure: boolean
        auth: {
            user: string
            password: string
        }
    }
    s3: {
        accessKeyId: string
        secretAccessKey: string
        region: string
        bucketName: string
        expiresIn: number
    }
}

export default (): Configuration => ({
    common: {
        nodeEnv: process.env.NODE_ENV || 'development',
        networkEnv: process.env.NETWORK_ENV || 'TESTNET',
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3307,
        name: process.env.DB_NAME || 'exment_market',
        user: process.env.DB_USER || 'root',
        pass: process.env.DB_PASS || '10703223',
        type: process.env.DB_TYPE || 'mysql',
        logging: process.env.DB_LOGGING === 'true',
        synchronize: process.env.DB_SYNC === 'true',
    },
    api: {
        port: parseInt(process.env.API_PORT, 10) || 4000,
        prefix: process.env.API_PREFIX || 'api',
        accessJwtSecretKey: process.env.ACCESS_JWT_SECRET_KEY || '',
        refreshJwtSecretKey: process.env.REFRESH_JWT_SECRET_KEY || '',
        accessTokenExpireInSec: parseInt(
            process.env.ACCESS_TOKEN_EXPIRE_IN_SEC,
            10,
        ),
        refreshTokenExpireInSec: parseInt(
            process.env.REFRESH_TOKEN_EXPIRE_IN_SEC,
            10,
        ),
        secretSystemAdminPasswordKey: process.env.PASSWORD_SECRET_KEY,
        systemAdminAccessJwtSecretKey:
            process.env.SYSTEM_ADMIN_ACCESS_JWT_SECRET_KEY || '',
        systemAdminRefreshJwtSecretKey:
            process.env.SYSTEM_ADMIN_REFRESH_JWT_SECRET_KEY || '',
        systemAdminAccessTokenExpireInSec: parseInt(
            process.env.SYSTEM_ADMIN_ACCESS_TOKEN_EXPIRE_IN_SEC,
            10,
        ),
        systemAdminRefreshTokenExpireInSec: parseInt(
            process.env.SYSTEM_ADMIN_REFRESH_TOKEN_EXPIRE_IN_SEC,
            10,
        ),
    },
    email: {
        host: process.env.EMAIL_HOST,
        // port: parseInt(process.env.EMAIL_PORT,10),
        secure: isBoolean(process.env.EMAIL_SECURE),
        auth: {
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASSWORD,
        },
    },
    s3: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        region: process.env.S3_REGION || '',
        bucketName: process.env.S3_BUCKET_NAME || '',
        expiresIn: parseInt(process.env.S3_URL_EXPIRES_IN_SEC, 10) || 300,
    },
})
