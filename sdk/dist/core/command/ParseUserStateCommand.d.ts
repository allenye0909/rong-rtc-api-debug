import { RCRTCLiveRole } from '../enums/RCRTCLiveRole';
import { Invoker } from '../Invoker';
import { Store } from '../Store';
import { BaseCommand, CommandPriority } from './BaseCommand';
import { Subscribehook } from './UpdateSubscribeListCommand';
declare type StateMsgContent = {
    users: {
        userId: string;
        /**
         * 状态值，其中
         * * `0`: 进入房间
         * * `1`: 退出房间
         * * `2`: 用户离线，当作离开房间处理
         */
        state: '0' | '1' | '2';
        /**
         * 角色切换类型，0 代表非切换身份发生的加入、退出房间行为
         */
        switchRoleType: RCRTCLiveRole | 0;
        /**
         * 加房间的身份标识，保存主房间 roomId
         */
        extra?: {
            [key: string]: string;
        };
    }[];
};
/**
 * RCRTC:State 消息解析结果
 */
export interface IParseUserStateRes {
    /**
     * 新加入人员 ID 列表
     */
    joined: string[];
    /**
     * 退出人员 ID 列表
     */
    left: string[];
    /**
     * 通过观众升级成为主播的主播 ID 列表
     */
    upgrade: string[];
    /**
     * 由主播降级为观众的人员 ID 列表
     */
    downgrade: string[];
}
export declare class ParseUserStateCommand extends BaseCommand<IParseUserStateRes> {
    private msgContent;
    private subhook;
    constructor(msgContent: StateMsgContent, subhook: Subscribehook);
    get priority(): CommandPriority;
    execute(store: Store, invoker: Invoker): Promise<IParseUserStateRes>;
}
export {};
//# sourceMappingURL=ParseUserStateCommand.d.ts.map