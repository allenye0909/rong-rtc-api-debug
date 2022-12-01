import { RCRTCCode } from '../enums/RCRTCCode';
import { Invoker } from '../Invoker';
import { IMCUConfig, ISetEnableCDN } from '../service';
import { Store } from '../Store';
import { BaseCommand } from './BaseCommand';
export declare class MCUConfigFlushCommand extends BaseCommand<{
    code: RCRTCCode;
    res?: any;
}> {
    private data;
    private cdnValues;
    constructor(data: IMCUConfig | ISetEnableCDN, cdnValues: IMCUConfig);
    execute(store: Store, invoker: Invoker): Promise<{
        code: RCRTCCode;
        res?: any;
    }>;
}
//# sourceMappingURL=MCUConfigFlushCommand.d.ts.map