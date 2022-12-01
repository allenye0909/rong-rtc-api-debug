import { RCRTCCode } from '../enums/RCRTCCode';
import { Invoker } from '../Invoker';
import { IMCUConfig } from '../service/mcu-interface';
import { Store } from '../Store';
import { BaseCommand } from './BaseCommand';
export declare class EnableInnerCDNCommand extends BaseCommand<{
    code: RCRTCCode;
}> {
    private cdnValues;
    private enable;
    constructor(cdnValues: IMCUConfig, enable: boolean);
    execute(store: Store, invoker: Invoker): Promise<{
        code: RCRTCCode;
    }>;
}
//# sourceMappingURL=EnabelInnerCDNCommand.d.ts.map