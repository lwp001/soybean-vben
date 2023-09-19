/** 终端信息 */
export interface TerminalInfo {
  imei: string;
  terminal_id: number;
  sim: string;
  imsi: string;
  iccid: string;
  security_chip_id: string;
  can_matrix_ver: number;
  can_baudrate: number;
  vin: string;
  hardware: number;
  soft_ver: string;
  status: number;
  utc: string;
  lat: number;
  lng: number;
  speed: number;
  updated: string;
}

export const CmdMap = new Map([
  [0x0302, '查询应答'],
  [0xffff, '异常提示']
]);

export function get_cmd_name(val: number): string {
  return CmdMap.get(val) || `未知命令: ${val}`;
}
