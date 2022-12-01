import { RCRTCCode } from '../enums/RCRTCCode';
import { Invoker } from '../Invoker';
import { IExchangeReqBody, IExchangeResponse, IRTCReqHeader } from '../service';
import { Store } from '../Store';
import { BaseCommand } from './BaseCommand';
export declare class ExchangeCommand extends BaseCommand<{
    code: RCRTCCode;
    data?: IExchangeResponse;
}> {
    private headers;
    private reqBody;
    constructor(headers: IRTCReqHeader, reqBody: IExchangeReqBody);
    execute(store: Store, invoker: Invoker): Promise<{
        code: RCRTCCode;
        data?: IExchangeResponse;
    }>;
}
//# sourceMappingURL=ExchangeCommand.d.ts.map