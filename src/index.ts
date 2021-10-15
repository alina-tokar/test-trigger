import { SalePagesSdk, FileStorageSaveDto, SearchMaintenanceDto, SearchTemplateDto, GetTemplateDto, SearchOrderDto, ExportOrderCsvDto, UpdateOrderDto, GetOrderDto, CancelOrderDto, GetOrderTransactionDto, DownloadOrderInvoiceDto, AddPageDto, GetPageDto, UpdatePageDto, UpdatePageStatusDto, ExtendedHealthDto, SearchPageDto, GetPageBySlugDto, GetPagePaymentMethodsDto, MetaDataDto, CheckoutRequestDto } from '@greeninvoice/salepages-backend-services';
import { Api, LambdaListener } from '@greeninvoice/lambda-backend-tools';
import { BusinessRequestDto, Principal } from '@greeninvoice/backend-library';
import { config } from './load-config';

const services = new SalePagesSdk(config);

const api = new Api(services.getContainer());

api.get(ExtendedHealthDto,'/admin/health/extended', (dto: ExtendedHealthDto) => services.getHealthService().extendedHealthCheck(dto), requireValidUser);
api.get(SearchMaintenanceDto,'/admin/reindex', (dto:SearchMaintenanceDto) => services.getMaintenanceService().reindex(), requireValidUser);

api.post(AddPageDto, '/pages', (dto: AddPageDto) => services.getPagesService().addPage(dto), requireValidUser);
api.put(UpdatePageDto, '/pages/:id', (dto: UpdatePageDto) => services.getPagesService().updatePage(dto), requireValidUser);
api.get(GetPageDto, '/pages/:id', (dto: GetPageDto) => services.getPagesService().getPage(dto), requireValidUser);
api.post(SearchPageDto,'/pages/search', (dto: SearchPageDto) => services.getPagesService().searchPage(dto), requireValidUser);
api.get(GetPageBySlugDto,'/pages/by-slug', (dto: GetPageBySlugDto) => services.getPagesSlugsService().getPageSlugs(dto.slug), requireValidUser);
api.get(GetPagePaymentMethodsDto,'/pages/:id/methods', (dto: GetPagePaymentMethodsDto) => services.getPagesPaymentsService().getPagePaymentMethods(dto), requireValidUser);
api.put(UpdatePageStatusDto, '/pages/:id/status', (dto: UpdatePageStatusDto) => services.getPagesService().updatePageStatus(dto), requireValidUser);
api.post(FileStorageSaveDto, '/pages/upload', (dto: FileStorageSaveDto) => services.getUploadImageService().saveImage(dto), requireValidUser);
api.post(BusinessRequestDto,'/pages/upload/url',(dto: BusinessRequestDto) => services.getUploadImageService().getSignedUrl(dto),requireValidUser);

api.post(SearchTemplateDto,'/templates/search',(dto: SearchTemplateDto) => services.getTemplatesService().searchTemplates(dto),requireValidUser);
api.get(GetTemplateDto,'/templates/:id',(dto: GetTemplateDto) => services.getTemplatesService().getTemplate(dto),requireValidUser);

api.get(GetOrderDto,'/orders/:id',(dto: GetOrderDto) => services.getOrdersService().getOrder(dto) ,requireValidUser);
api.put(UpdateOrderDto,'/orders/:id',(dto: UpdateOrderDto) => services.getOrdersService().updateOrder(dto) ,requireValidUser);
api.get(DownloadOrderInvoiceDto,'/orders/:id/download',(dto: DownloadOrderInvoiceDto) => services.getOrdersService().downloadOrderInvoice(dto) ,requireValidUser);
api.get(GetOrderTransactionDto,'/orders/:id/transaction',(dto: GetOrderTransactionDto) => services.getOrdersService().getOrderTransaction(dto) ,requireValidUser);
api.post(CancelOrderDto,'/orders/:id/cancel',(dto: CancelOrderDto) => services.getOrdersService().cancelOrder(dto) ,requireValidUser);
api.post(SearchOrderDto,'/orders/search',(dto: SearchOrderDto) => services.getOrdersService().searchOrder(dto) ,requireValidUser);
api.post(ExportOrderCsvDto,'/orders/search/export',(dto: ExportOrderCsvDto) => services.getOrdersService().exportOrderCsv(dto) ,requireValidUser);
api.post(SearchOrderDto,'/orders/insights',(dto: SearchOrderDto) => services.getOrdersService().insights(dto) ,requireValidUser);

api.get(BusinessRequestDto,'/accounts',(dto: BusinessRequestDto) => services.getAccountService().getMe(dto),requireValidUser);

api.get(BusinessRequestDto, '/payments/methods', (dto: BusinessRequestDto) => services.getBusinessPaymentsService().getPaymentMethods(dto), requireValidUser);
api.post(CheckoutRequestDto,'/payments/request', (dto: CheckoutRequestDto) => services.getPaymentsService().getPaymentRequest(dto));

api.get(MetaDataDto,'/metadata',(dto:MetaDataDto) => services.getMetadataService().getAppMetadata(),requireValidUser);


export const handler: LambdaListener = api.listen();

async function requireValidUser(identity: Principal) : Promise<boolean> {
    return Promise.resolve(identity != null);
}