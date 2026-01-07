<template>
  <div class="flex flex-col gap-6 p-4 rounded-2xl bg-surface-40">
    <div class="flex flex-col border border-surface-20 rounded-lg p-4 gap-4">
      <div class="flex justify-between items-center gap-6">
        <el-image :src="`https://ai-project.das-uty.uz/${editData.fullImageUrl}`" :preview-src-list="[
          `https://ai-project.das-uty.uz/${editData.fullImageUrl}`
        ]" fit="cover" class="w-full cursor-pointer rounded-md" :preview-teleported="true" closeOnPressEscape
          hideOnClickModal />

        <el-image :src="`https://ai-project.das-uty.uz/${editData.imageUrl}`" :preview-src-list="[
          `https://ai-project.das-uty.uz/${editData.imageUrl}`
        ]" fit="cover" class="w-full cursor-pointer rounded-md" :preview-teleported="true" closeOnPressEscape
          hideOnClickModal />
      </div>

      <div class="w-full bg-surface-20 h-[1px]"></div>

      <div class="flex gap-6">
        <div class="flex flex-col gap-2.5 flex-1 justify-start items-start">
          <span>{{ $t('wagons.name') }}</span>
          <Tag :title="editData.wagonName" color="surface" />
        </div>
        <div class="flex flex-col gap-2.5 flex-1 justify-start items-start">
          <span>{{ $t('wagon.number') }}</span>
          <Tag :title="editData.wagonNumber"
            :color="editData.wagonNumber === '********' ? 'danger' : editData.wagonNumber?.includes('*') ? 'info' : 'surface'" />
        </div>
      </div>
    </div>

    <el-form :model="formData" ref="formDataRef" :rules="formDataRules" label-position="top" v-loading="loading">
      <el-form-item :label="$t('allWagons.form.number')" prop="wagonNumber">
        <FormInput :prefix-icon="IconCoinNumber" v-model="formData.wagonNumber"
          :placeholder="$t('allWagons.form.numberPlaceholder')" />
      </el-form-item>
    </el-form>

    <Button @click.prevent="onSubmit" :title="$t('action.save')" type="submit" color="info" class="h-10 grow"></Button>
  </div>
</template>

<script setup lang="ts">
import { IconCoinNumber } from '#components';
import type { components } from '@/api/apiMethods.types';
import type { ElForm } from 'element-plus';

type WagonSessionItemDto = components["schemas"]["WagonSessionItemDto"];
type UpdateWagonDto = components["schemas"]["UpdateWagonDto"];

const loading = ref<boolean>(false);
const formDataRef = ref<InstanceType<typeof ElForm>>();

const emit = defineEmits(["cancel", "get"]);

const formDataRules = {
  wagonNumber: [{ required: true, message: "", trigger: "blur" }],
};

const props = defineProps<{
  editData: WagonSessionItemDto;
  camera_id: string;
}>();

function onSubmit() {
  formDataRef.value?.validate((valid) => {
    if (valid) {
      submit();
    }
  });
}

const formData = reactive<UpdateWagonDto>({
  wagonNumber: props.editData.wagonNumber ?? '',
  wagonId: props.editData.id
})

const submit = async () => {
  loading.value = true;
  const { error } = await useApiService().WagonSession.WagonSessionController_updateWagonNumber(props.camera_id, [formData])

  if (error.value?.message) {
    loading.value = false;
  } else {
    loading.value = false;
    emit("get")
    emit("cancel");
  }
};
</script>