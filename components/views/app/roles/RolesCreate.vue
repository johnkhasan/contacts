<template>
  <el-form :model="formData" ref="formDataRef" :rules="formDataRules" label-position="top"
    class="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-40" v-loading="loading">

    <el-form-item :label="$t('roles.form.name')" prop="name">
      <FormInput :prefix-icon="IconCoinNumber" v-model="formData.name"
        :placeholder="$t('roles.form.namePlaceholder')" />
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
import { IconDownload, IconCoinNumber } from "#components";
import type { components } from "@/api/apiMethods.types";
import type { ElForm } from "element-plus";

type Role = components["schemas"]["RoleDto"];
type CreateRole = components["schemas"]["CreateRoleRequest"];

const props = defineProps<{
  isEdit?: boolean;
  editData?: Role | null;
}>();

const emit = defineEmits(["cancel", "get"]);

const formDataRef = ref<InstanceType<typeof ElForm>>();
const loading = ref<boolean>(false);
const error = ref<{ message: string } | null>(null);

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

const formData = reactive<CreateRole>({
  name: ""
});


const submit = async () => {
  loading.value = true;

  if (props.isEdit) {
    const { error: resError } = await useApiService().Role.updateRole(props.editData!.id, formData)
    error.value = resError.value;
  } else {
    const { error: resError } = await useApiService().Role.createRole(formData)

    error.value = resError.value;
  }
  if (error.value?.message) {
    loading.value = false;
  } else {
    emit("get");
    emit("cancel");
  }
};

onMounted(() => {
  if (props.isEdit && props.editData) {
    formData.name = props.editData.name;
  }
});
</script>
