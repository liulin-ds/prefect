<template>
  <p-layout-default class="flows">
    <template #header>
      <PageHeadingFlows />
    </template>

    <template v-if="loaded">
      <template v-if="empty">
        <FlowsPageEmptyState />
      </template>

      <template v-else>
        <FlowList @delete="handleDelete" />
      </template>
    </template>
  </p-layout-default>
</template>

<script lang="ts" setup>
  import { FlowList, FlowsPageEmptyState, PageHeadingFlows, useWorkspaceApi } from '@prefecthq/prefect-ui-library'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { usePageTitle } from '@/compositions/usePageTitle'

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }

  const flowsCountSubscription = useSubscription(api.flows.getFlowsCount, [{}], subscriptionOptions)
  const flowsCount = computed(() => flowsCountSubscription.response ?? 0)
  const empty = computed(() => flowsCountSubscription.executed && flowsCount.value === 0)
  const loaded = computed(() => flowsCountSubscription.executed)


  const handleDelete = (): void => {
    flowsCountSubscription.refresh()
  }

  usePageTitle('Flows')
</script>
