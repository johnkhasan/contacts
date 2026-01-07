<template>
  <div class="flex flex-col">
    <Table :data="data.items" :columns="columns" class="flex-1" :actions="{ view: true, width: 150 }"
      @view="viewMethod">
      <template #name="{ row }">
        {{ useGetTranslation(row.organization.name) }}
      </template>

      <template #ruleStatus="{ row }">
        <div class="py-1 px-2 rounded text-white flex justify-start items-center">
          <div :class="['w-[64px] px-2 py-1 rounded flex items-center justify-center font-semibold',
            row.recordCount < 0 && 'bg-success-100 border-success-50',
            0 < row.recordCount && row.recordCount < 10 && 'bg-warning-100 border-warning-50',
            row.recordCount > 10 && 'bg-danger-100 border-danger-50'
          ]">
            <span>
              {{ row.recordCount < 0 ? $t(`common.status.good`) : (0 < row.recordCount && row.recordCount < 10 ?
                $t(`common.status.average`) : (row.recordCount > 10 ? $t(`common.status.bad`) : '')) }}
            </span>
          </div>
        </div>
      </template>
    </Table>

    <Pagination :total="data?.total" v-model:page="model.page" v-model:size="model.size" @get="$emit('get')" />
  </div>
</template>

<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';
import type { basePagination, TableColumn } from '@/types';

type CountCameraByCompaniesResponse = components["schemas"]["CountCameraByCompaniesResponse"];
type CountCameraByCompaniesItem = components["schemas"]["CountCameraByCompaniesItem"];

const { t } = useI18n();
const router = useRouter();
const model = defineModel<Partial<CountCameraByCompaniesResponse & basePagination>>({
  default: {}
});

defineEmits<{
  (e: 'get'): void;
}>();

defineProps<{
  data: CountCameraByCompaniesResponse;
}>();

const viewMethod = (row: CountCameraByCompaniesItem) => {
  router.push(`/helmet/companies/${row.organization.id}`);
};

const columns = computed<TableColumn<CountCameraByCompaniesItem>[]>(() => [
  { prop: "name", label: t("helmet.company"), custom: true },
  { prop: "cameraCount", label: t("helmet.cameraNumber"), width: 320 },
  { prop: "recordCount", label: t("helmet.violationNumber"), width: 320 },
  { prop: "ruleStatus", label: t("helmet.ruleStatus"), width: 220, custom: true },
])
</script>
