import type { TerminalInfo } from '../models';
import { request } from '../request';

/** 终端信息 */
export function fetchTerminalInfo() {
  return request.get<TerminalInfo[]>('/terminal_info');
}
