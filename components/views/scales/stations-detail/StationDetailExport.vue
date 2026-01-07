<template>
  <el-form ref="formDataRef" :rules="formDataRules" :model="formData" label-position="top"
    class="flex flex-col gap-6 p-4 rounded-2xl bg-surface-40">
    <ElFormItem prop="type">
      <Radio v-model="type" :options="options" />
    </ElFormItem>

    <FormItem v-if="type === TypeEnum.Daily" :label="$t('date.chooseTheDate')">
      <DatePicker v-model="formData.selectDate" :icon="PrefixIconCalendar" :placeholder="$t('date.choose')" />
    </FormItem>

    <div v-else class="flex gap-4">
      <FormItem :label="$t('date.chooseTheDate')">
        <DatePicker v-model="formData.fromDate" :icon="PrefixIconCalendar" :placeholder="$t('date.from')" />
      </FormItem>

      <FormItem label="&nbsp;">
        <DatePicker v-model="formData.toDate" :icon="PrefixIconCalendar" :placeholder="$t('date.till')" />
      </FormItem>
    </div>

    <div class="flex gap-4">
      <Button @click.prevent="$emit('cancel')" :title="$t('action.cancel')" type="reset" variant="outlined"
        class="h-10 grow"></Button>

      <Button @click.prevent="onSubmit" :title="$t('action.download')" :icon="IconDownload" type="submit"
        color="success" class="h-10 grow"></Button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { IconDownload, PrefixIconCalendar } from "#components";
import { ElNotification, type ElForm } from "element-plus";

enum TypeEnum {
  Daily = "daily",
  Period = "period"
}

const formDataRef = ref<InstanceType<typeof ElForm>>();
const type = ref<TypeEnum>(TypeEnum.Daily);
const formDataRules = {
  selectDate: [{ required: true, message: "", trigger: "blur" }],
  fromDate: [{ required: true, message: "", trigger: "blur" }],
  toDate: [{ required: true, message: "", trigger: "blur" }]
};

const props = defineProps<{
  stationCode: string;
}>();
defineEmits(["cancel"]);

const { t } = useI18n();

const options = computed(() => [
  {
    label: t("wagon.downloadType.daily"),
    value: TypeEnum.Daily
  },
  {
    label: t("wagon.downloadType.period"),
    value: TypeEnum.Period
  }
]);

type FormData = {
  selectDate?: string;
  fromDate?: string;
  toDate?: string;
  stationCode?: string;
};

const formData = reactive<Partial<FormData>>({
  stationCode: props.stationCode,
  selectDate: undefined,
  fromDate: undefined,
  toDate: undefined
});

function onSubmit() {
  formDataRef.value?.validate((valid) => {
    if (valid) {
      submit();
    }
  });
}

async function submit() {
  const { data, error } = await useApiService({
    params: formData,
    responseType: "blob"
  }).Wagon_Scale_Values.WagonScaleValueController_export();

  if (error.value) {
    console.error(error.value);
    ElNotification.error({
      title: t("action.error"),
      message: t('notification.errorMessage')
    });
    return;
  }

  const blob = data.value;

  // @ts-ignore
  const fileURL = URL.createObjectURL(blob);
  window.open(fileURL, "_blank");
}

</script>
