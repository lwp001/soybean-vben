<template>
  <div class="h-full overflow-hidden">
    <n-card :bordered="false" class="h-full rounded-8px shadow-sm">
      <loading-empty-wrapper class="h-480px" :loading="loading" :empty="empty">
        <n-data-table
          :columns="columns"
          :data="dataSource"
          :flex-height="true"
          class="h-780px"
          :scroll-x="2250"
          striped
        />
      </loading-empty-wrapper>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref, watchEffect, onUnmounted } from 'vue';
import { NSpace, NButton, useMessage, useDialog } from 'naive-ui';
import type { DataTableColumn } from 'naive-ui';
import { useWebSocket } from '@vueuse/core';
import { useLoadingEmpty } from '@/hooks';
import { fetchTerminalInfo } from '@/service/api/long-gong';
import type { TerminalInfo } from '@/service/models';
import { get_cmd_name } from '@/service/models';

// type DataSource = LoongIndustry.TerminalInfo;

interface DownData {
  imei: string;
  cmd: number;
  data: string;
}

const { loading, startLoading, endLoading, empty } = useLoadingEmpty();

const columns: DataTableColumn<TerminalInfo>[] = [
  {
    title: '序号',
    key: 'index',
    render: (_, index) => {
      return `${index + 1}`;
    },
    align: 'center',
    width: 55,
    fixed: 'left'
  },
  {
    title: 'IMEI',
    key: 'imei',
    align: 'left',
    width: 150,
    fixed: 'left'
  },
  {
    title: 'SIM',
    key: 'sim',
    align: 'left',
    width: 135
  },
  {
    title: '终端ID',
    key: 'terminal_id',
    align: 'left',
    width: 165
  },
  {
    title: 'IMSI',
    key: 'imsi',
    align: 'left',
    width: 150
  },
  {
    title: 'ICCID',
    key: 'iccid',
    align: 'left',
    width: 125,
    ellipsis: true
  },
  {
    title: '安全芯片ID',
    key: 'security_chip_id',
    align: 'left',
    width: 125,
    ellipsis: true
  },
  {
    title: 'CAN矩阵版本',
    key: 'can_matrix_ver',
    align: 'left',
    width: 120
  },
  {
    title: 'CAN波特率',
    key: 'can_baudrate',
    align: 'left',
    width: 100
  },
  {
    title: '硬件版本',
    key: 'hardware',
    align: 'left',
    width: 125
  },
  {
    title: '软件版本',
    key: 'soft_ver',
    align: 'left',
    width: 125
  },
  {
    title: '状态',
    key: 'status',
    align: 'left',
    width: 75
  },
  {
    title: 'UTC',
    key: 'utc',
    align: 'left',
    width: 165
  },
  {
    title: '经纬度',
    key: 'lat',
    render: row => {
      if (row.lat === undefined || row.lat === null) return '';
      return `${row.lng},${row.lat}`;
    },
    align: 'left',
    width: 185
  },
  {
    title: '速度(km/h)',
    key: 'speed',
    align: 'left',
    width: 100
  },
  {
    title: '更新时间',
    key: 'updated',
    align: 'left',
    width: 165
  },
  {
    key: 'action',
    title: '指令',
    align: 'center',
    width: 200,
    fixed: 'right',
    render: row => {
      return (
        <NSpace justify={'center'}>
          <NButton
            size={'small'}
            onClick={() => {
              handleControl(row.imei);
            }}
          >
            控制指令
          </NButton>
          <NButton
            size={'small'}
            onClick={() => {
              handleQuery(row.imei);
            }}
          >
            查询指令
          </NButton>
        </NSpace>
      );
    }
  }
];

const dataSource = ref<TerminalInfo[]>([]);
const nvMessage = useMessage();
const nvDialog = useDialog();

async function getDataSource() {
  startLoading();
  const { data } = await fetchTerminalInfo();
  // console.log('获取数据:', res);
  dataSource.value = data || [];
  endLoading();
}

function handleControl(_imei: string) {
  //
}

const ws_url = 'ws://121.196.199.208:3000/ws';
// const ws_url = 'ws://192.168.55.128:3000/ws';
const { status, data, send } = useWebSocket(ws_url, {
  autoReconnect: false,
  heartbeat: false
});

watchEffect(() => {
  if (data.value) {
    console.log('接收到的数据:', data.value);
    try {
      const res = JSON.parse(data.value) as DownData;
      nvDialog.info({
        title: `${res.imei}(${get_cmd_name(res.cmd)})`,
        style: {
          whiteSpace: 'pre-line'
        },
        content: res.data
      });
    } catch (error) {}
  }
});

function handleQuery(imei: string) {
  const obj = {
    imei,
    cmd: 0x8302,
    data: ''
  };
  if (status.value !== 'OPEN') {
    nvMessage.error('Socket 未连接');
  }
  send(JSON.stringify(obj));
}

onMounted(() => {
  getDataSource();
  // open();
});
onUnmounted(() => {
  nvMessage.destroyAll();
  nvDialog.destroyAll();
});
</script>

<style scoped></style>
