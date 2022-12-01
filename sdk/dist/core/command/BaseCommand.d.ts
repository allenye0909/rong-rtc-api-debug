import { RCCommandKind } from '../enums/RCCommandKind';
import { BaseInvoker } from '../Invoker';
import { Store } from '../Store';
export declare enum CommandPriority {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2
}
export declare enum CommandCode {
    Destroy = 40400
}
/**
 * 命令基类
 */
export declare abstract class BaseCommand<RES, STORE = Store> {
    /**
     * 执行指令
     * @param store
     */
    abstract execute(store: STORE, invoker: BaseInvoker<STORE>): Promise<RES>;
    /**
     * 获取指令优先级，必要时可 override 此函数
     */
    get priority(): CommandPriority;
    /**
     * 它返回命令的种类。
     * @returns 命令的种类。
     */
    get kind(): RCCommandKind;
}
//# sourceMappingURL=BaseCommand.d.ts.map