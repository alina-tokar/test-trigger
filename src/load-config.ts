import { SalePagesConfig } from '@greeninvoice/salepages-backend-services';

import * as dotenv from 'dotenv';
dotenv.config();

import { LoggerLevel } from '@greeninvoice/backend-library';

export const config = new SalePagesConfig();

config.MinimumLogLevel = LoggerLevel[process.env.LOG_LEVEL?.toUpperCase()] || LoggerLevel.DEBUG;
config.WriteLogsToFile = process.env.LOG_FILE;
config.ElasticPrefix = process.env.ELASTIC_PREFIX;
config.ElasticUri = process.env.ELASTIC_URL;
config.DynamoTablePrefix = process.env.DYNAMO_TABLE_PREFIX;
config.OrderCompleteNotifyUrl = process.env.ORDER_COMPLETE_NOTIFY_URL;
config.GreenInvoicePublic = process.env.GI_PUBLIC_URL;
config.GreenInvoiceApp = process.env.GI_APP_URL;
config.GreenInvoiceApi = process.env.GI_API_URL;
config.SalesAppUrl = process.env.SALES_APP_URL;
config.GeneratePageThumbnails = process.env.GENERATE_PAGE_THUMBNAILS === 'true';
// config.VatRate = parseFloat(process.env.VAT_RATE);
config.SqsCloudfrontInvalidate = process.env.SQS_CLOUDFRONT_INVALIDATE;
config.SqsBGThumbnails = process.env.SQS_THUMBNAILS;
config.S3Url = process.env.S3_CDN_URL;
config.S3Directory = process.env.S3_DIRECTORY;
config.S3Bucket = process.env.S3_BUCKET;
config.AwsRegion = process.env.AWS_REGION || 'eu-west-1';
config.PostmarkServerToken = process.env.POSTMARK_SERVER_TOKEN;
config.SystemEmail = process.env.SYSTEM_EMAIL;
config.GreenInvoiceSharedSecret = process.env.GI_SHARED_SECRET;

config.ApiFlashToken = process.env.API_FLASH_TOKEN;


/** local */
config.AwsEndpoint = process.env.LOCALSTACK_ENDPOINT;
config.EditorUrl = process.env.EDITOR_URL;

console.log('SalePages services configuration: ' + JSON.stringify(config, null, 2));
