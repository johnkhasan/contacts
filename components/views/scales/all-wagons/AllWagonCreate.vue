<template>
  <el-form :model="formData" ref="formDataRef" :rules="formDataRules" label-position="top"
    class="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-40" v-loading="loading">
    <el-form-item :label="$t('allWagons.form.number')" prop="wagonNumber">
      <FormInput :prefix-icon="IconCoinNumber" v-model="formData.wagonNumber"
        :placeholder="$t('allWagons.form.numberPlaceholder')" />
    </el-form-item>

    <el-form-item :label="$t('allWagons.form.weight')" prop="konteyner">
      <FormInput :prefix-icon="IconAlignDown" v-model.number="formData.konteyner"
        :placeholder="$t('allWagons.form.weightPlaceholder')" type="number" />
    </el-form-item>

    <el-form-item :label="$t('allWagons.form.wagonWeight')" prop="cargoRise">
      <FormInput :prefix-icon="IconAlignHorizontalCenter" v-model.number="formData.cargoRise"
        :placeholder="$t('allWagons.form.wagonWeightPlaceholder')" type="number" />
    </el-form-item>

    <div class="flex gap-4">
      <Button @click.prevent="$emit('cancel')" :title="$t('action.cancel')" type="reset" variant="outlined"
        class="h-10 grow"></Button>

      <Button @click.prevent="onSubmit" :title="$t('action.download')" :icon="IconDownload" type="submit"
        color="success" class="h-10 grow"></Button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { IconDownload, IconCoinNumber, IconAlignDown, IconAlignHorizontalCenter } from "#components";
import type { CreateWagonType } from "@/types";
import type { ElForm } from "element-plus";

const emit = defineEmits(["cancel", "get"]);

const formDataRef = ref<InstanceType<typeof ElForm>>();
const loading = ref<boolean>(false);

const formDataRules = {
  wagonNumber: [{ required: true, message: "", trigger: "blur" }],
  konteyner: [{ required: true, message: "", trigger: "blur" }],
  cargoRise: [{ required: true, message: "", trigger: "blur" }]
};

function onSubmit() {
  formDataRef.value?.validate((valid) => {
    if (valid) {
      submit();
    }
  });
}

const formData = reactive<CreateWagonType>({
  wagonNumber: "",
  konteyner: undefined,
  cargoRise: undefined,
  wagonOkpo: undefined
});


const submit = async () => {
  loading.value = true;
  const { error } = await useApiService().Wagons.createWagon(formData)
  if (error.value?.message) {
    loading.value = false;
  } else {
    emit("cancel");
    emit("get");
  }
};
</script>
