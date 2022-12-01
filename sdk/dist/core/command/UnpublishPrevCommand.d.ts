import { Store } from '../Store';
import { BaseCommand } from './BaseCommand';
/**
 * 加入房间后，若房间中已存在己方发布的资源，表示之前未能完成正常退出流程
 * 需先清除房间内的己方资源，通知房间内其他人己方已取消当前资源的发布
 * 该步骤没有必要与 MediaServer 的交互，因后续资源变更交互为全量交互
 */
export declare class UnpublishPrevCommand extends BaseCommand<void> {
    execute(store: Store): Promise<void>;
}
//# sourceMappingURL=UnpublishPrevCommand.d.ts.map