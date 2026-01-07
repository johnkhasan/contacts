<template>
  <Table :data="data?.items" :columns="columns" :actions="{
    edit: true, width: 150
  }" :page="data?.page" :size="data?.size" :permissions="{ edit: ['update_wagon_number'] }"
    @edit="$emit('edit', $event)">

    <template #wagonNumber="{ row }">
      <Tag :title="row.wagonNumber"
        :color="!row.isWagonNumber ? 'danger' : row.wagonNumber?.includes('*') ? 'info' : 'surface'" />
    </template>

    <template #enteredAt="{ row }">
      <div>
        <Tag :title="useFormatDateTime(row.enteredAt ? row.enteredAt : row.createdAt)" color="surface" />
      </div>
    </template>

    <template #wagonName="{ row }">
      <Tag :title="row.wagonName" color="surface" />
    </template>

    <template #imageUrl="{ row }">
      <el-image :src="row.imageUrl" :preview-src-list="[
        row.imageUrl ?? ''
      ]" fit="fill" class="w-[100px] h-[34px] cursor-pointer rounded-md" :preview-teleported="true" closeOnPressEscape
        hideOnClickModal />
    </template>

    <template #fullImageUrl="{ row }">
      <el-image :src="row.fullImageUrl" :preview-src-list="[
        row.fullImageUrl ?? ''
      ]" fit="fill" class="w-[120px] h-[60px] cursor-pointer rounded-md" :preview-teleported="true" closeOnPressEscape
        hideOnClickModal />
    </template>

  </Table>

  <Pagination :total="data?.total" v-model:page="model.page" v-model:size="model.size" @get="$emit('get')" />
</template>

<script setup lang="ts">
import type { components } from "@/api/apiMethods.types";
import type { basePagination, CameraWagonFilterParams, TableColumn } from "@/types";
type WagonItemsListResponse = components["schemas"]["WagonItemsListResponse"];
type WagonSessionItemDto = components["schemas"]["WagonSessionItemDto"];

const { t } = useI18n();

const model = defineModel<Partial<CameraWagonFilterParams & basePagination>>({
  default: {}
});

defineEmits<{
  (e: "get"): void;
  (e: "edit", row: WagonSessionItemDto): void;
}>();

const props = defineProps({
  data: {
    type: Object as () => WagonItemsListResponse,
    required: true
  },
})

const columns = computed<TableColumn<WagonSessionItemDto>[]>(() => [
  {
    prop: "fullImageUrl",
    label: t("wagon.image"),
    width: 180
  },
  {
    prop: "imageUrl",
    label: t("common.numberPhoto"),
    width: 180
  },
  {
    prop: "wagonNumber",
    label: t("wagon.number"),
    width: 180
  },
  {
    prop: "enteredAt",
    label: t("common.time"),
    width: 200
  },
  {
    prop: "wagonName",
    label: t("wagons.name")
  },
]);
</script>
